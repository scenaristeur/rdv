<template>
    <div>
        <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 400px" ref="map">
            <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

            <ol-tile-layer>
                <ol-source-osm />
            </ol-tile-layer>


            <ol-interaction-select @select="featureSelected">
                <ol-style>
                    <!-- <ol-style-stroke color="green" :width="10"></ol-style-stroke>
        <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
        <ol-style-icon :src="hereIcon" :scale="0.05"></ol-style-icon> -->
                    <ol-style-circle :radius="radius * 2">
                        <ol-style-fill color="green"></ol-style-fill>
                        <ol-style-stroke color="red" :width="strokeWidth"></ol-style-stroke>
                        <ol-style-text text="selected"></ol-style-text>

                    </ol-style-circle>
                </ol-style>
            </ol-interaction-select>

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

            <ol-context-menu-control :items="contextMenuItems" />

            <ol-vector-layer>
                <ol-source-vector ref="markers">
                    <ol-style>
                        <ol-style-icon :src="marker" :scale="0.05"></ol-style-icon>
                    </ol-style>


                    <!-- <ol-source-vector ref="markers">
                <ol-feature :coordinates="coordinates">
                    <ol-style>
                        <ol-style-icon :src="hereIcon" :scale="0.1"></ol-style-icon>
                    </ol-style>
                </ol-feature> -->
                </ol-source-vector>
            </ol-vector-layer>

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
        <!-- <BModal v-model="modal" @ok="onAddRdv">


            <BRow class="my-1" v-for="field in inputFields" :key="field.id">
                <BCol sm="3">
                    <label :for="`type-${field.name}`"><code>{{ field.name }}</code>:</label>
                </BCol>
                <BCol sm="9">
                    <BFormInput :disabled="!edit" :id="`type-${field.name}`" :type="field.type" v-model="rdv[field.id]"
                        v-bind:min="field.min" />
                </BCol>
            </BRow>
          
        </BModal> -->
        <BModal v-model="modal" @ok="onAddRdv" size="lg">
            <!--    :style="'backgroundColor:'+rdv.color" -->
            <label for="datePicker"><code>When ?</code> <small v-if="edit == true"><i>7 days max</i></small></label>
            <VueDatePicker id="datePicker" v-model="date" range partial-range max-range="7" :format-locale="fr" format="Pp"
              :min-date="new Date()" :max-date="new Date(new Date().setDate(new Date().getDate() + 15))" :disabled="!edit" />
      
            <div role="group">
              <label for="input-live"><code>Title:</code></label>
              <b-form-input id="input-live" v-model="rdv.title" :state="stateTitle" @input="titleState" :disabled="!edit"
                aria-describedby="input-live-help input-live-feedback" placeholder="Title" trim></b-form-input>
      
              <!-- This will only be shown if the preceding input has an invalid state -->
              <b-form-invalid-feedback id="input-live-feedback">
                Enter at least 3 and less than 50 letters
              </b-form-invalid-feedback>
      
              <!-- This is a form text block (formerly known as help block) -->
              <b-form-text id="input-live-help">A cool title for your event.</b-form-text>
            </div>
      
      
            <label for="textarea"><code>Description:</code></label>
            <b-form-textarea id="textarea" v-model="rdv.description" placeholder="Description" rows="3" max-rows="6"
              :disabled="!edit"></b-form-textarea>
      
            <!--     <BRow class="my-1" v-for="field in inputFields" :key="field.id">
              <BCol sm="3">
                <label :for="`type-${field.name}`"><code>{{ field.name }}</code>:</label>
              </BCol>
              <BCol sm="9">
                <BFormInput :disabled="!edit" :id="`type-${field.name}`" :type="field.type" v-model="rdv[field.id]"
                  v-bind:min="field.min" />
              </BCol>
            </BRow> -->
            <b-row>
              <b-col>
                <label for="color"><code>Color:</code></label>
                <b-form-input id="color" v-model="rdv.color" :disabled="!edit" type="color"></b-form-input>
              </b-col>
              <b-col>
                <label for="password"><code>Password:</code></label>
                <b-form-input id="password" v-model="password" placeholder="password protect" type="password"></b-form-input>
              </b-col>
            </b-row>
            <!-- <div class="mt-2">Value: {{ rdv }}</div> -->
          </BModal>
    </div>
</template>

<script>
// import { inject } from "vue";
import marker from "@/assets/marker.png";
import hereIcon from "@/assets/here.png";
import pin_drop from "@/assets/pin_drop.png";

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { fr } from 'date-fns/locale';
import sha256 from 'crypto-js/sha256';

import Base64 from 'crypto-js/enc-base64';

// const Feature = inject("ol-feature");
// const Geom = inject("ol-geom");
import Feature from "ol/Feature";
// import  Geometry from "ol/geom/Geometry";
// console.log("Geometry", Geometry)
import Point from "ol/geom/Point";
import { store as ystore, awareness } from "@/y_store";

import { v4 as uuidv4 } from "uuid";



export default {
    name: "MapComponent",
    components: {
        VueDatePicker
    },
    data() {
        return {
            initialisation: true,
            // view
            center: [47.41322, -1.219482],
            rotation: 0,
            zoom: 14,//2,//2,
            projection: "EPSG:4326",
            // geolocation
            position: [],
            hereIcon: hereIcon,
            marker: marker,
            // userMarkers: [],
            radius: 10,
            strokeWidth: 4,
            strokeColor: "red",
            fillColor: "white",
            coordinates: [],
            contextMenuItems: null,
            rdv: {},
            edit: false,
            modal: false,
            inputFields: [
                { id: 'title', name: 'Title', type: 'text' },
                { id: 'desc', name: 'Description', type: 'text' },
                { id: 'color', name: 'Color', type: 'color' },
                { id: 'start_date', name: 'Start Date', type: 'date', min: new Date().toISOString().split('T')[0] },
                { id: 'start_time', name: 'Start Time', type: 'time' },
                { id: 'end_date', name: 'End Date', type: 'date', min: new Date().toISOString().split('T')[0] },
                { id: 'end_time', name: 'End Time', type: 'time' },


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
            ],
            fr: fr,
            stateTitle: false,
            date: null,
            password: null


        };
    },
    created() {
        this.initContextMenu()
    },

    methods: {
        titleState ()  {

this.stateTitle= this.edit != true || (this.rdv.title.length > 2 && this.rdv.title.length < 51) ? true : false
// console.log("input",inp, stateTitle.value)
},
        initContextMenu() {
            let app = this
            this.contextMenuItems = [
                {
                    text: "Center map here",
                    classname: "some-style-class", // add some CSS rules
                    callback: (val) => {
                        app.$refs.view.setCenter(val.coordinate);
                    }, // `center` is your callback function
                },
                {
                    text: "Add a rdv",
                    classname: "some-style-class", // you can add this icon with a CSS class
                    // instead of `icon` property (see next line)
                    icon: pin_drop, // this can be relative or absolute
                    callback: (val) => {
                        // console.log(val);
                        app.rdv = {
                            uuid: uuidv4(),
                            author: awareness.clientID,
                            coordinates: val.coordinate,
                            start_date: new Date().toISOString().split('T')[0],
                            end_date: new Date().toISOString().split('T')[0],
                            start_time: "00:00",
                            end_time: "23:59"
                        }
                        // console.log(rdv)
                        app.edit = true
                        app.modal = true

                    },
                },
                {
                    text: "Add a Marker",
                    classname: "some-style-class", // you can add this icon with a CSS class
                    // instead of `icon` property (see next line)
                    icon: marker, // this can be relative or absolute
                    callback: (val) => {
                        console.log(val);
                        const feature = new Feature({
                            geometry: new Point(val.coordinate),
                        });
                        console.log("new feature", feature)
                        app.$refs.markers.source.addFeature(feature);
                        // console.log(app.markers)
                    },
                },
                "-", // this is a separator
            ];
        },
        onAddRdv () {

            console.log(this.date)
  if (this.date[1] == null){this.date[1] = this.date[0]}
  this.rdv.start_date = this.date[0].toLocaleDateString()
  this.rdv.start_time = this.date[0].toLocaleTimeString()
  this.rdv.end_date = this.date[1].toLocaleDateString()
  this.rdv.end_time = this.date[1].toLocaleTimeString()
  this.rdv.password = Base64.stringify(sha256(this.password));
  this.password = ""
            console.log(this.rdv)

            this.rdv.updated = Date.now()


            const feature = new Feature({
                geometry: new Point(this.rdv.coordinates),
                data: this.rdv
            });
            // console.log("feature1", feature)
            if (this.edit == true) {
                this.$refs.markers.source.addFeature(feature);
                ystore.rdvs[this.rdv.uuid] = this.rdv
            }
            // ystore.rdvs[this.rdv.uuid] != undefined ? delete ystore.rdvs[this.rdv.uuid] : ""


        },
        featureSelected(event) {
            console.log("feature selected", event.selected, event.target)
            if (event.selected.length > 0) {
                let selected_uuid = event.selected[0].get('uuid')
                console.log("selected", event.selected[0], selected_uuid)

            }
        },
        geoLocChange(event) {
            // if(this.initialisation == true){
            //     this.zoom = 15
            //     this.initialisation = false
            // }
            this.position = event.target.getPosition();
            this.$store.commit('core/updateMyPosition', this.position)
            if (this.centerMe == true) {
                this.$refs.view.setCenter(this.position);
            }

            awareness.setLocalStateField('position', {
                // Define a print name that should be displayed
                coordinates: this.position,
                updated: Date.now()
            })
        },
        userMapClicked(e) {
            console.log(e)
        },
        // updateUserMarkers() {
        //     console.log("users in map", this.users)
        //     //console.log("markers", this.userMarkers)
        //     // this.coordinates = this.users.map((u) => {
        //     //     return u.position && u.position.coordinates || []
        //     // })
        //     // this.users.forEach(s => {
        //     //     let exist = this.$refs.userMarkers.source.getFeatures().find(f => f.get('clientID') == s.profile.clientID)
        //     //     console.log(exist)
        //     //     if (exist == false || exist == undefined) {

        //     //         const feature = new Feature({
        //     //             geometry: new Geom.Point(s.position.coordinates),
        //     //             name: s.profile.name,
        //     //             color: s.profile.color,
        //     //             clientID: s.profile.clientID
        //     //         });
        //     //         // console.log("feature", feature, markers.value.source.getFeatures())
        //     //         // console.log("find existing marker by values.clientID in  markers.value.source.getFeatures",)

        //     //         this.$refs.userMarkers.source.addFeature(feature);
        //     //     } else {
        //     //         exist.getGeometry().setCoordinates(s.position.coordinates)
        //     //     }
        //     // })
        // }
    },
    watch: {
        // users() {
        //     this.updateUserMarkers()
        // },
        centerMe() {
            if (this.centerMe == true) {
                console.log("center me", this.centerMe)
                // this.$store.commit('core/centerMe', false)
                this.$refs.view.setCenter(this.position);
            }
        },
        centerPoint() {
            console.log(this.centerPoint)
            this.$refs.view.setCenter(this.centerPoint);
            // this.$refs.view.setZoom(15);
        }
    },
    computed: {
        users() {
            return this.$store.state.core.users
        },
        rdvs() {
            return this.$store.state.core.rdvs
        },
        centerMe() {
            return this.$store.state.core.centerMe
        },
        centerPoint() {
            return this.$store.state.core.centerPoint
        },

    }
}
</script>

<style scoped></style>