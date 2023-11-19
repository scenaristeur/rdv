<template>
    <div>

    </div>
</template>

<script>
import * as Vue from "vue";
import { store as ystore, awareness } from "@/y_store";
import { enableVueBindings, observeDeep } from "@syncedstore/core";
enableVueBindings(Vue);

export default {
    name: "RdvUpdater",
    created() {
        console.log("RDV CREATED !!!!!!!!!!!!!!!!!!!!!", awareness)
        observeDeep(ystore.rdvs, this.rdvsUpdate,)
    },
    methods: {
        rdvsUpdate() {
            let rdvs = []
            for (let [uuid, rdv] of Object.entries(ystore.rdvs)) {
                if (uuid != awareness.clientID) {
                  
                    console.log("coordin", uuid, rdv.coordinates[0], rdv.coordinates[1], rdv.title)
                    console.log("dates", uuid, rdv.end_date, rdv.end_time/*rdv.toJSON(),*/ /*rdv.ownKeys()*/)
                    let iso8601 = rdv.end_date + "T" + rdv.end_time //+ ":00Z"
                    console.log("iso", iso8601)
                    let date = new Date(iso8601)
                    let now = Date.now()
                    console.log(now, date)
                    let diff = date.getTime() - now
                    if (diff < 0) {
                        console.log("diff delete", diff)
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

                        rdvs.push(rdv)

                        // const feature = new Feature({
                        //     geometry: new Geom.Point(rdv.coordinates),
                        //     name: rdv.title, //+ rdv.start_date + rdv.end_date,
                        //     uuid: uuid
                        // });
                        // markers.value.source.addFeature(feature);

                    } else {
                        console.log(uuid, "no end_date")
                        delete ystore.rdvs[uuid]
                    }
                }

            }
            this.$store.commit('core/setRdvs', rdvs)
        },
    }
}
</script>

<style scoped></style>