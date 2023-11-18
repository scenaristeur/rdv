<template>
    <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 400px" ref="map">
        <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

        <ol-tile-layer>
            <ol-source-osm />
        </ol-tile-layer>


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
        <ol-vector-layer>
            <ol-source-vector>
                <ol-feature v-for="(u,i) in users" :key="i">
                    <ol-geom-multi-point v-if="u.position != undefined" :coordinates="u.position.coordinates"></ol-geom-multi-point>
                    <ol-style>
                        <ol-style-circle :radius="radius" @click="userMapClicked">
                            <ol-style-fill :color="fillColor"></ol-style-fill>
                            <ol-style-stroke :color="u.profile.color" :width="strokeWidth"></ol-style-stroke>
                            <ol-style-text :text="u.profile.name"></ol-style-text>

                        </ol-style-circle>
                    </ol-style>
                </ol-feature>
            </ol-source-vector>
        </ol-vector-layer>
    </ol-map>
</template>

<script>
// import { inject } from "vue";
import hereIcon from "@/assets/here.png";
import { awareness } from "@/y_store";
// const Feature = inject("ol-feature");
// const Geom = inject("ol-geom");
// console.log("Feature", Feature)


export default {
    name: "MapComponent",
    components: {

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
            // userMarkers: [],
            radius: 10,
            strokeWidth: 4,
            strokeColor: "red",
            fillColor: "white",
            coordinates: []
            // [
            //             [116.544921, 40.451633],
            //             [116.545264, 40.451649],
            //             [116.545865, 40.451698],
            //             [116.546144, 40.451551],
            //             [116.546337, 40.451274],
            //             [116.546788, 40.451143],
            //             [116.547324, 40.451078],
            //             [116.547539, 40.450996],
            //             [116.547839, 40.450719],
            //             [116.54844, 40.450506],
            //             [116.548933, 40.450604],
            //             [116.549448, 40.450604],
            //             [116.550242, 40.450376],
            //             [116.550865, 40.450163],
            //             [116.551702, 40.449935],
            //             [116.552581, 40.449576],
            //         ]
        };
    },

    methods: {
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
        updateUserMarkers() {
            console.log("users in map", this.users)
            //console.log("markers", this.userMarkers)
            // this.coordinates = this.users.map((u) => {
            //     return u.position && u.position.coordinates || []
            // })
            // this.users.forEach(s => {
            //     let exist = this.$refs.userMarkers.source.getFeatures().find(f => f.get('clientID') == s.profile.clientID)
            //     console.log(exist)
            //     if (exist == false || exist == undefined) {

            //         const feature = new Feature({
            //             geometry: new Geom.Point(s.position.coordinates),
            //             name: s.profile.name,
            //             color: s.profile.color,
            //             clientID: s.profile.clientID
            //         });
            //         // console.log("feature", feature, markers.value.source.getFeatures())
            //         // console.log("find existing marker by values.clientID in  markers.value.source.getFeatures",)

            //         this.$refs.userMarkers.source.addFeature(feature);
            //     } else {
            //         exist.getGeometry().setCoordinates(s.position.coordinates)
            //     }
            // })
        }
    },
    watch: {
        users() {
            this.updateUserMarkers()
        },
        centerMe() {
            if (this.centerMe == true) {
                console.log("center me", this.centerMe)
                // this.$store.commit('core/centerMe', false)
                this.$refs.view.setCenter(this.position);
            }
        },
        centerUser() {
            console.log(this.centerUser)
            this.$refs.view.setCenter(this.centerUser);
           // this.$refs.view.setZoom(15);
        }
    },
    computed: {
        users() {
            return this.$store.state.core.users
        },
        centerMe() {
            return this.$store.state.core.centerMe
        },
        centerUser() {
            return this.$store.state.core.centerUser
        },

    }
}
</script>

<style scoped></style>