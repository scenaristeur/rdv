<template>
  AVANT
 val <div>{{ value }}</div>
  <br>
  users {{ users }}<br>rdvs {{ rdvs }}
  <input type="text" name="Test Value" id v-model="text" />

  <label>{{ label }}</label>
  <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 400px">
    <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

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

const center = ref([1.39, 43.58]);
const projection = ref("EPSG:4326");
const zoom = ref(8);
const rotation = ref(0);
import marker from "@/assets/marker.png";

const strokeWidth = ref(10);

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

const text = ref("test");

const label = computed(() => {
  return text.value;
});



// return {
//   text,
//   label
// };


</script>