<template>

  <b-button-group size="sm">
    <BButton @click="followMe = !followMe" :variant="followMe == true ? 'outline-warning' : 'outline-success'"> {{
      followMe ==
      true ? "don't follow me" : "follow me" }}</BButton>
  </b-button-group>
  <!-- users {{ users }}<br>rdvs {{ rdvs }}
  <input type="text" name="Test Value" id v-model="text" />

  <label>{{ label }}</label> -->
  <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 400px">
    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-interaction-select @select="featureSelected" :condition="selectCondition" :features="selectedFeatures">
      <ol-style :overrideStyleFunction="overrideStyleFunction">
        <ol-style-fill :color="fillColor"></ol-style-fill>
        <ol-style-icon :src="marker_selected" :scale="0.1"></ol-style-icon>
        <ol-style-text color="white" text="Hellooooo"></ol-style-text>
      </ol-style>
    </ol-interaction-select>


    <ol-context-menu-control :items="contextMenuItems" />


    <ol-geolocation :projection="projection" @change:position="geoLocChange">
      <template>
        <ol-vector-layer :zIndex="2">
          <ol-source-vector>
            <ol-feature ref="positionFeature">
              <ol-geom-point :coordinates="position"></ol-geom-point>
              <ol-style>
                <ol-style-icon :src="hereIcon" :scale="0.1"></ol-style-icon>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </template>
    </ol-geolocation>

    <!-- users -->
    <ol-vector-layer>
      <ol-source-vector>
        <ol-feature v-for="(u, i) in users" :key="i">
          <ol-geom-multi-point v-if="u.position != undefined" :coordinates="u.position.coordinates"></ol-geom-multi-point>
          <ol-style>
            <ol-style-circle :radius="radius">
              <ol-style-fill :color="fillColor"></ol-style-fill>
              <ol-style-stroke :color="u.profile.color" :width="strokeWidth"></ol-style-stroke>
              <ol-style-text :text="u.profile.name"></ol-style-text>

            </ol-style-circle>
          </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer>

    <!-- RDVS-->

    <ol-vector-layer>
      <ol-source-vector ref="rdvMarkers"> </ol-source-vector>
      <ol-style :overrideStyleFunction="overrideStyleFunction">
        <ol-style-fill :color="fillColor"></ol-style-fill>
        <ol-style-icon :src="marker" :scale="0.05"></ol-style-icon>
        <ol-style-text text="Hellooooo"></ol-style-text>
      </ol-style>
    </ol-vector-layer>

    <!-- <ol-vector-layer>
      <ol-source-vector>
        <ol-feature v-for="r in rdvs" :key="r.uuid" :data="r">
          <ol-geom-multi-point v-if="r.coordinates != undefined" :coordinates="r.coordinates" :data="r">

          </ol-geom-multi-point>
          <ol-style>
            <ol-style-icon :src="marker" :scale="0.05"></ol-style-icon>
            <ol-style-text :text="r.title"></ol-style-text>
            <ol-style-stroke :color="r.color || 'yellow'" :width="strokeWidth"></ol-style-stroke>

           <ol-style-circle :radius="radius">
                                <ol-style-fill :color="r.color|| 'yellow'"></ol-style-fill>
                                <ol-style-stroke color="blue" :width="strokeWidth"></ol-style-stroke>
                                <ol-style-text :text="r.title"></ol-style-text>

                            </ol-style-circle> -->
    <!--  </ol-style>
        </ol-feature>
      </ol-source-vector>
    </ol-vector-layer> -->


  </ol-map>
  <RdvForm />
 
</template>

<script setup>
// import { /*defineComponent,*/ ref, computed } from "@vue/composition-api";

import { ref, /*computed,*/ defineProps, watch, inject } from "vue";
import { useStore } from 'vuex'
import marker from "@/assets/marker.png";
import marker_selected from "@/assets/marker_selected.png";
import hereIcon from "@/assets/here.png";
import pin_center from "@/assets/center.png";
import pin_drop from "@/assets/pin_drop.png";
const Feature = inject("ol-feature");
const Geom = inject("ol-geom");
import RdvForm from '@/components/RdvForm.vue'

//const center = ref([1.39, 43.58]);

const center = ref([2.58, 45]);
const projection = ref("EPSG:4326");
const zoom = ref(15);
const rotation = ref(0);

const fillColor = ref("white");
const strokeWidth = ref(1);
const radius = ref(10);

const store = useStore()

const view = ref();

const position = ref([]);
const followMe = ref(true)

const rdvMarkers = ref([]);

try {
  const localStorageMapView = localStorage.getItem('rdv_map_view')
  let mapview_conf = JSON.parse(localStorageMapView)
  zoom.value = mapview_conf.zoom
  center.value = mapview_conf.center
} catch (e) {
  console.log(e)
}



const prop = defineProps({
  value: { default: '', type: [String, Number] },
  users: { type: [Array] },
  rdvs: { type: [Array] },
})
const contextMenuItems = ref([]);

watch(
  () => prop.users,
  () => {
    console.log('prop users changed', prop.users)
  }
)

watch(
  () => prop.rdvs,
  () => {
    console.log('prop rdvs changed', prop.rdvs)
    for (let rdv of Object.values(prop.rdvs)) {
      console.log("-----", rdv.uuid, rdv.title, rdv)
      const feature = new Feature({
        geometry: new Geom.Point(rdv.coordinates),
        name: rdv.title, //+ rdv.start_date + rdv.end_date,
        uuid: rdv.uuid,
        data: rdv
      });
      rdvMarkers.value.source.addFeature(feature);
    }

  }
)


const geoLocChange = (event) => {
  console.log("AAAAA", event);
  position.value = event.target.getPosition();
  view.value?.setCenter(event.target?.getPosition());
  store.commit('core/updateMyPosition', position.value)
  if (followMe.value == true) {
    view.value?.setCenter(event.target?.getPosition());
  }
  console.log('++++++++++++++++++++zoom & pos', view.value.getCenter(), view.value.getZoom())

  localStorage.setItem('rdv_map_view', JSON.stringify({ center: view.value.getCenter(), zoom: view.value.getZoom() }))
};

// const trackCounter = computed(() => {
//   return store.state.core.counter;
// });


const selectConditions = inject("ol-selectconditions");

const selectCondition = selectConditions.click;

const featureSelected = (event) => {
  // console.log(event, event.target);
  if (event.selected.length > 0) {
    let selected = event.selected[0]
    let selected_uuid = selected.get('uuid')
    let selected_title = selected.get('title')
    console.log("selected", selected, selected_uuid, selected_title)

    let name = selected.get("name")
    let data = selected.get("data")
    console.log(name, data, data.description, data.color)
    store.commit('core/setRdv', data)
  }
};


const overrideStyleFunction = (feature, style) => {

  let color = feature.get("color");  //from extra data in properties of the feature
  // if(properties == "....") // change the style
  style.getImage().getFill != undefined && style.getImage().getFill().setColor(color);
  let name = feature.get("name");
  // console.log(style.getImage())
  style.getText().setText(name)

}
// const selectInteactionFilter = (feature) => {
//   console.log(feature.get)
//  // return feature.values_.name != undefined;
// };

contextMenuItems.value = [
  {
    text: "Center map here",
    icon: pin_center,
    classname: "some-style-class", // add some CSS rules
    callback: (val) => {
      view.value.setCenter(val.coordinate);
    }, // `center` is your callback function
  },
  {
    text: "Add a rdv",
    classname: "some-style-class", // you can add this icon with a CSS class
    // instead of `icon` property (see next line)
    icon: pin_drop, // this can be relative or absolute
    callback: (val) => {
      console.log(val)
      store.commit('core/setRdv', { coordinates: val.coordinate })
    },
  },
  "-", // this is a separator
];

</script>