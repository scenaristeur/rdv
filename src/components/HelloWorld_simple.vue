<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 400px"
    ref="map"
  >
    <ol-view
      ref="view"
      :center="center"
      :rotation="rotation"
      :zoom="zoom"
      :projection="projection"
    />

    <ol-tile-layer>
      <ol-source-osm />
    </ol-tile-layer>

    <ol-geolocation :projection="projection" @change:position="geoLocChange">
      <template v-slot="slotProps">
        <!-- SlotProps: {{ slotProps }} -->
        <ol-vector-layer :zIndex="2">
          <ol-source-vector>
            <ol-feature ref="positionFeature">
              <ol-geom-point :coordinates="slotProps.position"></ol-geom-point>
              <ol-style>
                <ol-style-icon :src="hereIcon" :scale="0.1"></ol-style-icon>
              </ol-style>
            </ol-feature>
          </ol-source-vector>
        </ol-vector-layer>
      </template>
    </ol-geolocation>
  </ol-map>
</template>

<script setup>
import hereIcon from "@/assets/marker_user.png";
import { ref } from "vue";
//import  { View } from "ol";
//import  { ObjectEvent } from "ol/Object";

const center = ref([40, 40]);
const projection = ref("EPSG:4326");
const zoom = ref(12);
const rotation = ref(0);
const view = ref();
const map = ref(null);

const geoLocChange = (event) => {
  view.value?.setCenter(event.target?.getPosition());
};
</script>