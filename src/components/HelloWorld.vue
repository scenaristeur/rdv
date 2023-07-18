<template>
  <div>
    <!-- <ul>
      <li>
        <input type="checkbox" id="zoom" v-model="zoomcontrol" />
        <label for="zoom">ol-zoom-control</label>
      </li>
    </ul> -->
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 85vh" ref="map">
      <ol-view :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" ref="view" />

      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>

      <ol-context-menu-control :items="contextMenuItems" />

      <ol-vector-layer>
        <ol-source-vector ref="markers"> </ol-source-vector>
        <ol-style>
          <ol-style-icon :src="marker" :scale="0.1"></ol-style-icon>
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
                  <ol-style-icon src="../assets/marker.png" :scale="0.1"></ol-style-icon>
                </ol-style>
              </ol-feature>
            </ol-source-vector>
          </ol-vector-layer>
        </template>
      </ol-geolocation>
      <ol-zoom-control />
      <ol-zoomslider-control />
      <ol-scaleline-control />
      <ol-rotate-control />
      <!-- <ol-zoomtoextent-control
      :extent="[23.906, 42.812, 46.934, 34.597]"
      tipLabel="Fit to Turkey"
    /> -->
    </ol-map>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";

import marker from "@/assets/marker.png";

const center = ref([40, 40]);
const projection = ref("EPSG:4326");
let zoom = ref(15);
const rotation = ref(0);

const contextMenuItems = ref([]);

const markers = ref(null);
const view = ref(null);

const Feature = inject("ol-feature");
const Geom = inject("ol-geom");
let currentPos = []

const geoLocChange = (event) => {
  currentPos = event.target?.getPosition()
  console.log(currentPos)
  view.value?.setCenter(event.target?.getPosition());
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
      view.value.setZoom(15)
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
    },
  },
  "-", // this is a separator
];
</script>