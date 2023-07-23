<template>
    <div>
        events
    </div>
</template>

<script>

import * as Vue from "vue";
import { store as ystore, awareness } from "@/y_store";
import { enableVueBindings, observeDeep } from "@syncedstore/core";

enableVueBindings(Vue);


export default {
    name: "GeoEvents",

    methods: {
        init() {
            console.log("init events", awareness.clientID)
            observeDeep(ystore.events, this.eventsUpdate)
        },
        eventsUpdate(e) {
           // console.log(e)
             e.forEach(event => { console.log("EVENT", event) })
            // if (this.markers.value != null) {
            //     // markers.value.getSource().clear()
            //     // e.forEach(position => { console.log("POS", position) })
            //     for (let [clientID, position] of Object.entries(ystore.positions)) {
            //         if (clientID != awareness.clientID) {
            //             console.log("clientID", clientID, position[0], position[1])
            //             const feature = new Feature({
            //                 geometry: new Geom.Point(position),
            //             });
            //             markers.value.source.addFeature(feature);
            //         }
            //     }
            // }
        }
    },
    watch: {
        'map': {
            handler() {
                // console.log(this.map)
                //if (this.map != undefined && this.map.view != undefined) {
                this.init()
                //}
                //  
            },
            deep: false
        }
    },
    computed: {
        map() {
            return this.$store.state.map
        }
    },
}
</script>

<style scoped></style>