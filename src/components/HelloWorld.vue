<template>
  <div>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 80vh" ref="map">
      <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

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



      <ol-vector-layer>
        <ol-source-vector ref="users"> </ol-source-vector>
        <ol-style :overrideStyleFunction="overrideStyleFunction">
          <ol-style-circle :radius="radius">
            <ol-style-fill :color="fillColor"></ol-style-fill>
            <ol-style-stroke :color="strokeColor" :width="strokeWidth"></ol-style-stroke>
            <ol-style-text text="Hellooooo"></ol-style-text>
          </ol-style-circle>
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
    <input type="checkbox" id="checkbox" ref="faking" v-model="checked" />
    <label for="checkbox">{{ checked }}</label> Fake

    <input type="checkbox" id="follow_me" ref="follow_me" checked v-model="follow_checked" />
    <label for="checkbox">{{ follow_checked }}</label> Follow me
    <!-- <button @click="addMarker">Add Marker</button> -->
    <hr>
    0.0.1
  </div>
</template>

<script setup>
import hereIcon from "@/assets/here.png";
import marker from "@/assets/marker.png";
//import marker_user from "@/assets/marker_user.png";
import { ref, inject } from "vue";
import { awareness } from "@/y_store";
// import { fromLonLat } from "ol/proj";
// import Point from "ol/geom/Point";
// import Icon from "ol/style/Icon";
// import  Style from "ol/style/Style";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
//import  { View } from "ol";
//import  { ObjectEvent } from "ol/Object";

const center = ref([2.2945009486790244, 48.858287635592696]);
const projection = ref("EPSG:4326");
const zoom = ref(17);
const rotation = ref(0);
const view = ref();
const map = ref(null);
const position = ref([]);

const contextMenuItems = ref([]);

const markers = ref([]);
const users = ref([]);
const faking = ref(true);
const follow_me = ref(true);
// let featuresArray = ref(null);

const radius = ref(5);
//const strokeWidth = ref(1);
const strokeColor = ref("red");
const fillColor = ref("white");


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
      // console.log("feature1", feature)
      markers.value.source.addFeature(feature);
    },
  },
  "-", // this is a separator
];
// var layerStyle = new Style({
//   image: new Icon({
//     src: marker, //?? // data url for max size image
//   })
// });

// var layer = new VectorLayer({
//   source: new VectorSource({
//     features: featuresArray
//   }),
//   style: function (feature) {
//     console.log(feature)
//     // if (feature.get('year') >= sliderYear) {
//     let scale = 0.1 //?? // calculate size for feature divided by max size
//     layerStyle.getImage().setScale(scale);
//     return layerStyle
//     //  }
//   }
// })



const overrideStyleFunction = (feature, style) => {

  let color = feature.get("color");  //from extra data in properties of the feature
  // if(properties == "....") // change the style
  style.getImage().getFill().setColor(color);
  let name = feature.get("name");
  console.log(style.getImage())
  style.getText().setText(name)

}




// You can think of your own awareness information as a key-value store.
// We update our "user" field to propagate relevant user information.
awareness.setLocalStateField('user', {
  // Define a print name that should be displayed
  name: 'user_' + Date.now(),
  // Define a color that should be associated to the user:
  color: '#ffb61e', // should be a hex color
  clientID: awareness.clientID
})

const geoLocChange = (event) => {
  console.log(awareness.clientID, event);
  let coordinates = event.target.getPosition()



  if (faking.value.checked) {
    coordinates[0] += Math.random() * (0.01 - (-0.01)) - 0.01
    coordinates[1] += Math.random() * (0.01 - (-0.01)) - 0.01
  }

  position.value = coordinates
  console.log("follow_me.value.checked", follow_me.value.checked)
  if (follow_me.value.checked) {
    view.value?.setCenter(coordinates);
  }



  awareness.setLocalStateField('position', {
    // Define a print name that should be displayed
    coordinates: coordinates,
    updated: Date.now()
  })
};

const updateUsers = (states) => {
  // let featuresArray = []
  states.forEach(s => {
    console.log(s.user.name, s.user.color, s.position?.coordinates)
    if (s.position != undefined && users.value != null && s.user.clientID != awareness.clientID) {
      let exist = users.value.source.getFeatures().find(f => f.get('clientID') == s.user.clientID)
      console.log("exist? ", s.user.clientID, exist)

      if (exist == undefined) {

        const feature = new Feature({
          geometry: new Geom.Point(s.position.coordinates),
          name: s.user.name,
          color: s.user.color,
          clientID: s.user.clientID
        });
        // console.log("feature", feature, markers.value.source.getFeatures())
        // console.log("find existing marker by values.clientID in  markers.value.source.getFeatures",)

        users.value.source.addFeature(feature);
      } else {
        exist.getGeometry().setCoordinates(s.position.coordinates)
      }
    }
  });
  //   }
  // featuresArray.push(feature)
  // });

  // if (featuresArray.length > 0){
  //   console.log(featuresArray)
  //  // markers.value.source.clear();
  // //markers.value.source.addFeatures(featuresArray);
  // }


  //  layer.changed()
}

// You can observe when a user updates their awareness information
awareness.on('change', () /*changes */ => {
  // console.log("changes", changes)
  // Whenever somebody updates their awareness information,
  // we log all awareness information from all users.
  console.log(Array.from(awareness.getStates().values()))
  updateUsers(Array.from(awareness.getStates().values()))
})





</script>

<style scoped>
button {
  border: 1px solid black;
  margin: 0.5rem 0;
  padding: 0.5rem;
}

button:hover,
button:focus {
  background-color: lightgray;
}
</style>