<template>
  <ol-map
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 80vh"
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


    <ol-context-menu-control :items="contextMenuItems" />

    <ol-vector-layer>
      <ol-source-vector ref="markers"> </ol-source-vector>
      <ol-style>
        <ol-style-icon :src="marker" :scale="0.05"></ol-style-icon>
      </ol-style>
    </ol-vector-layer>

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
  </ol-map>
</template>

<script setup>
import hereIcon from "@/assets/here.png";
import marker from "@/assets/marker.png";
import { ref, inject } from "vue";
import {  awareness } from "@/y_store";
//import  { View } from "ol";
//import  { ObjectEvent } from "ol/Object";

const center = ref([40, 40]);
const projection = ref("EPSG:4326");
const zoom = ref(12);
const rotation = ref(0);
const view = ref();
const map = ref(null);
const position = ref([]);

const contextMenuItems = ref([]);

const markers = ref(null);


const Feature = inject("ol-feature");
const Geom = inject("ol-geom");

contextMenuItems.value = [
  {
    text: "Center map here",
    classname: "some-style-class", // add some CSS rules
    callback: (val) => {
      view.value.setCenter(val.coordinate);
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
// var layerStyle =  new ol.style.Style({
//   image: new ol.style.Icon({
//     src: marker, //?? // data url for max size image
//   })
// });

// var layer = new ol.layer.Vector({
//   source: new ol.source.Vector({
//     features: featuresArray
//   }),
//   style: function (feature) {
//    // if (feature.get('year') >= sliderYear) {
//       scale = 0.1 //?? // calculate size for feature divided by max size
//       layerStyle.getImage().setScale(scale);
//       return layerStyle
//   //  }
//   }
// })

// You can think of your own awareness information as a key-value store.
// We update our "user" field to propagate relevant user information.
awareness.setLocalStateField('user', {
  // Define a print name that should be displayed
  name: 'user_'+Date.now(),
  // Define a color that should be associated to the user:
  color: '#ffb61e', // should be a hex color
  clientID: awareness.clientID
})

const geoLocChange = (event) => {
  console.log(awareness.clientID, event);
  position.value = event.target.getPosition();
  view.value?.setCenter(event.target?.getPosition());
  let coordinates = event.target.getPosition()
  awareness.setLocalStateField('position', {
  // Define a print name that should be displayed
  coordinates: coordinates,
  updated: Date.now()
})
};

const updateUsers = (states)=>{
  states.forEach(s => {
    console.log(s.user.name, s.user.color, s.position?.coordinates)
    
  });

}

// You can observe when a user updates their awareness information
awareness.on('change', () /*changes */=> {
 // console.log("changes", changes)
  // Whenever somebody updates their awareness information,
  // we log all awareness information from all users.
  console.log(Array.from(awareness.getStates().values()))
  updateUsers(Array.from(awareness.getStates().values()))
})





</script>