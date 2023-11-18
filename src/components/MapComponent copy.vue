<template>
    <div>
        <BContainer>

            <l-map ref="myMap" v-model:zoom="zoom" :center="center" @ready="doSomethingOnReady()">
                <l-tile-layer :url="url" :attribution="attribution" layer-type="base" name="OpenStreetMap"></l-tile-layer>
                <!-- <v-locatecontrol/> -->
                <l-control position="bottomleft">
                    <button @click="clickHandler">
                        I am a useless button!
                    </button>
                </l-control>
                <l-circle-marker :lat-lng="circle.center" :radius="circle.radius" :color="circle.color" />

            </l-map>

        </BContainer>
    </div>
</template>

<script>
// https://vue2-leaflet.netlify.app/components/LControl.html#demo
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LControl, LCircleMarker } from "@vue-leaflet/vue-leaflet";
// import Vue2LeafletLocatecontrol from 'vue2-leaflet-locatecontrol'

export default {
    name: "MapComponent",
    components: {
        LMap,
        LTileLayer,
        LControl, LCircleMarker,
        // 'v-locatecontrol': Vue2LeafletLocatecontrol
    },
    data() {
        return {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
                '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            center: [47.41322, -1.219482],
            zoom: 4,//2,
            circle: {
                center: [47.413220, -1.0482],
                radius: 6,
                color: 'red'
            },
        };
    },
    mounted() {
        let map_object = this.$refs.myMap.mapObject//.ANY_LEAFLET_MAP_METHOD();
        console.log(map_object)
    },
    methods: {
        doSomethingOnReady() {
            this.map = this.$refs.myMap.mapObject
            console.log(this.map)
        },
        clickHandler() {
            alert("clicked")
        }
    },
}
</script>

<style scoped>
.container {
    height: 600px;
    width: 100vw;

}
</style>