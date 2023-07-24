<template>
  <div>
    <ul class="checkbox-list">
      <li>
        <input type="checkbox" id="autoposition" v-model="autoposition" />
        <label for="autoposition">autoposition</label>
      </li>
    </ul>


    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 85vh" ref="map">
      <ol-view :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" ref="view" />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>

      <ol-context-menu-control :items="contextMenuItems" />


      <ol-vector-layer>
        <ol-source-vector ref="myposition"> </ol-source-vector>
        <ol-style>
          <ol-style-icon :src="marker_user" :scale="0.1"></ol-style-icon>
        </ol-style>
      </ol-vector-layer>





      <ol-geolocation :projection="projection" @change:position="geoLocChange">
        <template v-slot="slotProps">
          <!-- SlotProps: {{ slotProps }} -->
          <ol-vector-layer :zIndex="2">
            <ol-source-vector>
              <ol-feature ref="positionFeature">
                <ol-geom-point :coordinates="slotProps.position"></ol-geom-point>
                <ol-style>
                  <ol-style-icon :src="marker_user" :scale="0.1"></ol-style-icon>
                </ol-style>
              </ol-feature>
            </ol-source-vector>
          </ol-vector-layer>
        </template>
      </ol-geolocation>

      <ol-vector-layer>
        <ol-source-vector ref="markers"> </ol-source-vector>
        <ol-style>
          <ol-style-icon :src="marker" :scale="0.05"></ol-style-icon>
        </ol-style>
      </ol-vector-layer>

      <ol-zoom-control />
      <ol-zoomslider-control />
      <ol-scaleline-control />
      <ol-rotate-control />
      <!-- <ol-zoomtoextent-control
      :extent="[23.906, 42.812, 46.934, 34.597]"
      tipLabel="Fit to Turkey"
    /> -->
    </ol-map>
    awareness : {{ awareness.clientID }}
    <hr>
    positions : {{ ystore.positions }}


  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import * as Vue from "vue";
import marker from "@/assets/marker.png";
import marker_user from "@/assets/marker_user.png";
import { store as ystore, awareness } from "@/y_store";
import { enableVueBindings, observeDeep } from "@syncedstore/core";
enableVueBindings(Vue);

const center = ref([40, 40]);
const projection = ref("EPSG:4326");
let zoom = ref(15);
const rotation = ref(0);

const contextMenuItems = ref([]);

let markers = ref(null);
const view = ref(null);

const Feature = inject("ol-feature");
const Geom = inject("ol-geom");
let autoposition = true
let currentPos = []
let myposition = ref(null)

console.log(ystore)

const positionsUpdate = (e) => {
  console.log(e)
  if (markers.value != null) {
    // markers.value.getSource().clear()
   // e.forEach(position => { console.log("POS", position) })
    for (let [clientID, position] of Object.entries(ystore.positions)) {
      if (clientID != awareness.clientID) {
        console.log("clientID", clientID, position[0], position[1])
        const feature = new Feature({
          geometry: new Geom.Point(position),
        });
        markers.value.source.addFeature(feature);
      }
    }
  }




  // .forEach( => {
  //   const feature = new Feature({
  //         geometry: new Geom.Point(val.coordinate),
  //       });
  //       markers.value.source.addFeature(feature);

  // });


}

observeDeep(ystore.positions, positionsUpdate)



const geoLocChange = (event) => {
  // todo essayer avec https://openlayers.org/en/latest/examples/geolocation.html
  // ou https://openlayers.org/en/latest/examples/?q=geol
  currentPos = event.target?.getPosition()
  //console.log(currentPos)
  // console.log(markers)
  ystore.positions[awareness.clientID] = currentPos


  if (autoposition) {
    view.value?.setCenter(event.target?.getPosition());
    const feature = new Feature({
      geometry: new Geom.Point(currentPos),
    });
    feature.type = "userPosition"
    // myposition.value.getSource().clear()
    myposition.value.source.removeFeature(feature); // pas propre
    myposition.value.source.addFeature(feature);
    console.log(myposition.value.source)
  }
};

contextMenuItems.value = [
  {
    text: "Center map here",
    classname: "some-style-class", // add some CSS rules
    callback: (val) => {
      view.value.setCenter(val.coordinate);
    }, // `center` is your callback function
  },
  {
    text: "Where am i",
    classname: "some-style-class", // add some CSS rules
    callback: () => {
      view.value.setCenter(currentPos)
      view.value.setZoom(19)
    }, // `center` is your callback function
  },
  {
    text: "Add a Marker",
    classname: "some-style-class", // you can add this icon with a CSS class
    // instead of `icon` property (see next line)
    icon: marker, // this can be relative or absolute
    callback: (val) => {
      console.log(val);
      const feature = new Feature({
        geometry: new Geom.Point(val.coordinate),
      });
      markers.value.source.addFeature(feature);
      console.log(markers)
    },
  },
  "-", // this is a separator
];
</script>
<style>
ul.checkbox-list {
  columns: 2;
  padding: 0;
}

ul.checkbox-list>li {
  list-style: none;
}
</style>