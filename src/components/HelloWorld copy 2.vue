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

        <ol-style :overrideStyleFunction="overrideStyleFunction">
          <ol-style-icon :src="marker" :scale="0.05"></ol-style-icon>
          <ol-style-text text="Hellooooo"></ol-style-text>
        </ol-style>

      </ol-vector-layer>

      <ol-interaction-select @select="featureSelected" :condition="selectCondition" :features="selectedFeatures">
        <ol-style :overrideStyleFunction="overrideStyleFunction">
          <ol-style-icon :src="marker" :scale="0.1"></ol-style-icon>
          <ol-style-text color="white" text="Hellooooo"></ol-style-text>
        </ol-style>
      </ol-interaction-select>

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
    <label for="checkbox">Fake</label>
    &nbsp;&nbsp;
    <input type="checkbox" id="follow_me" ref="follow_me" checked v-model="follow_checked" />
    <label for="follow_me">Follow me</label>
    <!-- <button @click="addMarker">Add Marker</button> -->
    <!-- <BButton @click="modal = !modal"> Toggle modal </BButton> -->
    <BModal v-model="modal" @ok="onAddRdv">



      <BRow class="my-1" v-for="field in inputFields" :key="field.id">
        <BCol sm="3">
          <label :for="`type-${field.name}`"><code>{{ field.name }}</code>:</label>
        </BCol>
        <BCol sm="9">
          <BFormInput :disabled="!edit" :id="`type-${field.name}`" :type="field.type" v-model="rdv[field.id]"
            v-bind:min="field.min" />
        </BCol>

      </BRow>
      <VueDatePicker placeholder="période de un jour max ;-)" v-model="date" model-auto range max-range="1"
        disable-year-select locale="fr" :format-locale="fr" format="Pp" :disabled="!edit" ></VueDatePicker>

        <!-- :format="format" :disabled-dates="disabledDates" -->
      <!-- <div class="mt-2">Value: {{ rdv }}</div> -->
    </BModal>
    <!-- 
   

    <BFormInput v-model="rdv.title" placeholder="Enter your name" /> -->

    <hr>
    <small><i>right-click or long tap on the map to add a rdv</i></small>
    0.0.1
  </div>
</template>

<script setup>
import hereIcon from "@/assets/here.png";
import marker from "@/assets/marker.png";
//import marker_user from "@/assets/marker_user.png";
import * as Vue from "vue";
import { ref, inject, /*computed*/ } from "vue";
import { store as ystore, awareness } from "@/y_store";
import { enableVueBindings, observeDeep } from "@syncedstore/core";
enableVueBindings(Vue);
import { v4 as uuidv4 } from 'uuid';
import { Collection } from "ol";
// import { fromLonLat } from "ol/proj";
// import Point from "ol/geom/Point";
// import Icon from "ol/style/Icon";
// import  Style from "ol/style/Style";
// import VectorLayer from "ol/layer/Vector";
// import VectorSource from "ol/source/Vector";
//import  { View } from "ol";
//import  { ObjectEvent } from "ol/Object";
import { fr } from 'date-fns/locale';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
//const autorange = ref(1); // si on veut plus, banquer
const date = ref();

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
const faking = ref(false);
const follow_me = ref(true);
let checked = false;
let follow_checked = true

// let featuresArray = ref(null);

const radius = ref(5);
const strokeWidth = ref(1);
const strokeColor = ref("red");
const fillColor = ref("white");


const Feature = inject("ol-feature");
const Geom = inject("ol-geom");
const modal = ref(false)
const edit = ref(false)

const selectedFeatures = ref(new Collection());
//const modifyEnabled = ref(false);

const selectConditions = inject("ol-selectconditions");
const selectCondition = selectConditions.click;

function featureSelected(event) {
  console.log(event)
  if (event.selected.length > 0) {
    let selected_uuid = event.selected[0].get('uuid')
    console.log("selected", event.selected[0], event.selected[0].get('uuid'))
    rdv.value = ystore.rdvs[selected_uuid]
    console.log(rdv.value.author, 'if author = clientID, edit = true')
    // edit.value = rdv.value.author == awareness.clientID
    edit.value = false
    modal.value = true
  }
  // console.log(selectedFeatures)




  // modifyEnabled.value = false;
  // if (event.selected.length > 0) {
  //   modifyEnabled.value = true;
  // }
  // selectedFeatures.value = event.target.getFeatures();
}

// const format = (date) => {
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();
//   const hour = date.getHour()
//   const min = date.getMinutes()

//   return `${day}/${month}/${year} ${hour}:${min}`;
// }

// https://vue3openlayers.netlify.app/componentsguide/interactions/select/#usage
// const selectConditions = inject("ol-selectconditions");

// const selectCondition = selectConditions.pointerMove;

// const featureSelected = (event) => {
//   console.log(event);
// };

// const selectInteactionFilter = (feature) => {
//   console.log(feature/*,feature.get("title")*/);
//  // return feature.values_.name != undefined;
// };



const inputFields = [
  { id: 'title', name: 'Title', type: 'text' },
  { id: 'desc', name: 'Description', type: 'text' },
  // { id: 'start_date', name: 'Start Date', type: 'date', min: new Date().toISOString().split('T')[0] },
  // { id: 'start_time', name: 'Start Time', type: 'time' },
  // { id: 'end_date', name: 'End Date', type: 'date', min: new Date().toISOString().split('T')[0] },
  // { id: 'end_time', name: 'End Time', type: 'time' },


  // 'number',
  // 'email',
  // 'password',
  // 'search',
  // 'url',
  // 'tel',
  // 'date',
  // 'time',
  // 'range',
  // 'color',
  // 'datetime',
  // 'datetime-local',
  // 'month',
  // 'week',
]

let rdv = ref({})

// For demo purposes disables the next 2 days from the current date
// const disabledDates = computed((date) => {
//   console.log(date)
//   const today = new Date();

//   const tomorrow = new Date(today)
//   tomorrow.setDate(tomorrow.getDate() + 1)

//   const afterTomorrow = new Date(tomorrow);
//   afterTomorrow.setDate(tomorrow.getDate() + 1);

//   return [tomorrow, afterTomorrow]
// })

contextMenuItems.value = [
  {
    text: "Center map here",
    classname: "some-style-class", // add some CSS rules
    callback: (val) => {
      view.value.setCenter(val.coordinate);
      // view.value.zoom = 17
      // zoom.value = 17
      // map.value.changed()
      // view.value.setZoom(17)
    }, // `center` is your callback function
  },
  {
    text: "Add a rdv",
    classname: "some-style-class", // you can add this icon with a CSS class
    // instead of `icon` property (see next line)
    icon: marker, // this can be relative or absolute
    callback: (val) => {
      // console.log(val);
      rdv.value = {
        uuid: uuidv4(),
        author: awareness.clientID,
        coordinates: val.coordinate,
        start_date: new Date().toISOString().split('T')[0],
        end_date: new Date().toISOString().split('T')[0],
        start_time: "00:00",
        end_time: "23:59"
      }
      // console.log(rdv)
      edit.value = true
      modal.value = true

    },
  },
  "-", // this is a separator
];



const onAddRdv = () => {
  console.log(date.value)
  let [s, e] = date.value
  console.log(s)
  console.log(e)

date.value = []
let [start_date, start_time] = new Date(s).toISOString().split('T')
let [end_date, end_time]  = new Date(e).toISOString().split('T')

console.log(start_date, start_time, end_date, end_time)

rdv.value.start_date = start_date
rdv.value.start_time = start_time
rdv.value.end_date = end_date
rdv.value.end_time = end_time

  console.log(rdv.value)

  rdv.value.updated = Date.now()


  const feature = new Feature({
    geometry: new Geom.Point(rdv.value.coordinates),
    data: rdv.value
  });
  // console.log("feature1", feature)
  if (edit.value == true) {
    markers.value.source.addFeature(feature);
    ystore.rdvs[rdv.value.uuid] = rdv.value
  }
  // ystore.rdvs[rdv.value.uuid] != undefined ? delete ystore.rdvs[rdv.value.uuid] : ""


}



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
  style.getImage().getFill != undefined && style.getImage().getFill().setColor(color);
  let name = feature.get("name");
  // console.log(style.getImage())
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
    //  console.log(s.user.name, s.user.color, s.position?.coordinates)
    if (s.position != undefined && users.value != null && s.user.clientID != awareness.clientID && users.value.source != undefined) {
      let exist = users.value.source.getFeatures().find(f => f.get('clientID') == s.user.clientID)
      //  console.log("exist? ", s.user.clientID, exist)

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
  // console.log(Array.from(awareness.getStates().values()))
  updateUsers(Array.from(awareness.getStates().values()))
})




const rdvsUpdate = (e) => {
  console.log(e)
  if (markers.value != null) {
    // markers.value.getSource().clear()
    // e.forEach(position => { console.log("POS", position) })
    for (let [uuid, rdv] of Object.entries(ystore.rdvs)) {
      if (uuid != awareness.clientID) {
        console.log("coordin", uuid, rdv.coordinates[0], rdv.coordinates[1], rdv.title)
        console.log("dates", uuid, rdv.end_date, rdv.end_time/*rdv.toJSON(),*/ /*rdv.ownKeys()*/)
        let iso8601 = rdv.end_date + "T" + rdv.end_time + ":00Z"
        let date = new Date(iso8601)
        let now = Date.now()
        console.log(now, date)
        let diff = date.getTime() - now
        if (diff < 0) {
          delete ystore.rdvs[uuid]
          return
        }
        //date to timestamp  https://stackoverflow.com/questions/9873197/how-to-convert-date-to-timestamp 
        if (rdv.end_date != undefined && rdv.end_time != undefined) {

          // let d = rdv.end_date.split("-").join("/") + " " + rdv.end_time != undefined ? rdv.end_time : "23:59"
          // console.log(d)
          // let strDate = new Date(d)
          // console.log(strDate, strDate.getTime())
          // var datum = Date.parse(strDate);
          // console.log(datum)



          const feature = new Feature({
            geometry: new Geom.Point(rdv.coordinates),
            name: rdv.title, //+ rdv.start_date + rdv.end_date,
            uuid: uuid
          });
          markers.value.source.addFeature(feature);

        } else {
          console.log(uuid, "no end_date")
          delete ystore.rdvs[uuid]
        }
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

observeDeep(ystore.rdvs, rdvsUpdate)
rdvsUpdate()

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