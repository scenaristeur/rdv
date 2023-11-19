<template>
  AVANT
 val <div>{{ value }}</div> <p>Counter: {{ trackCounter }}</p>
  <br>
  <button @click="incrementCounter">Increment</button>
  users {{ users }}<br>rdvs {{ rdvs }}
  <input type="text" name="Test Value" id v-model="text" />

  <label>{{ label }}</label>
  <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 400px">
    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>
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
                          <ol-geom-multi-point v-if="u.position != undefined"
                              :coordinates="u.position.coordinates"></ol-geom-multi-point>
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
                <ol-source-vector>
                    <ol-feature v-for="r in rdvs" :key="r.uuid">
                        <ol-geom-multi-point v-if="r.coordinates != undefined"
                            :coordinates="r.coordinates"></ol-geom-multi-point>
                        <ol-style>
                            <ol-style-icon :src="marker" :scale="0.05"></ol-style-icon>
                            <ol-style-text :text="r.title"></ol-style-text>
                            <ol-style-stroke :color="r.color|| 'yellow'" :width="strokeWidth"></ol-style-stroke>

                            <!-- <ol-style-circle :radius="radius">
                                <ol-style-fill :color="r.color|| 'yellow'"></ol-style-fill>
                                <ol-style-stroke color="blue" :width="strokeWidth"></ol-style-stroke>
                                <ol-style-text :text="r.title"></ol-style-text>

                            </ol-style-circle> -->
                        </ol-style>
                    </ol-feature>
                </ol-source-vector>
            </ol-vector-layer>
        
  </ol-map>
  APRES
</template>

<script setup>
// import { /*defineComponent,*/ ref, computed } from "@vue/composition-api";

import { ref, computed, defineProps, watch } from "vue";
import { useStore } from 'vuex'
import marker from "@/assets/marker.png";
import hereIcon from "@/assets/here.png";

const center = ref([1.39, 43.58]);
const projection = ref("EPSG:4326");
const zoom = ref(15);
const rotation = ref(0);

const fillColor = ref("white");
const strokeWidth = ref(1);
const radius = ref(10);

const store = useStore()

const view = ref();

const position = ref([]);

const prop = defineProps({
  value: { default: '', type: [String, Number] },
  users: { type: [Array] },
  rdvs: {  type: [Array] },
})

watch(
  () => prop.value,
  () => {
    console.log('prop value changed', prop.value)
  }
)

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

  }
)



const incrementCounter = () => {
      // replace 'this.$store' with
      // the new 'store' reference
      store.dispatch('core/increment', 1)
    }

const geoLocChange = (event) => {
  console.log("AAAAA", event);
  position.value = event.target.getPosition();
  view.value?.setCenter(event.target?.getPosition());
  store.commit('core/updateMyPosition', position.value)
};


// geoLocChange(event) {
//             // if(this.initialisation == true){
//             //     this.zoom = 15
//             //     this.initialisation = false
//             // }
//             this.position = event.target.getPosition();
//             this.$store.commit('core/updateMyPosition', this.position)
//             if (this.centerMe == true) {
//                 this.$refs.view.setCenter(this.position);
//             }

//             awareness.setLocalStateField('position', {
//                 // Define a print name that should be displayed
//                 coordinates: this.position,
//                 updated: Date.now()
//             })
//         },

const text = ref("test");

const label = computed(() => {
  return text.value;
});

const trackCounter = computed(() => {
  return store.state.core.counter;
});
// computed: {
//     trackCounter() {
//       return this.$store.getters.getCounter
//     }



// return {
//   text,
//   label
// };


</script>