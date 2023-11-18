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
    </ol-map>
</template>

<script>
import hereIcon from "@/assets/here.png";
export default {
    name: "MapComponent",
    components: {

    },
    data() {
        return {
            initialisation :true,
            // view
            center: [47.41322, -1.219482],
            rotation: 0,
            zoom: 14,//2,//2,
            projection: "EPSG:4326",
            // geolocation
            position: [],
            hereIcon: hereIcon
        };
    },

    methods: {
        geoLocChange(event) {
            // if(this.initialisation == true){
            //     this.zoom = 15
            //     this.initialisation = false
            // }
            this.position = event.target.getPosition();
            console.log("AAAAA", event);
            this.$refs.view.setCenter(event.target.getPosition());
   
        }

    },
}
</script>

<style scoped></style>