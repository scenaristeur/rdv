<template>
    <div>
        [[ display calendar]]
        <!-- rdvs :{{ rdvs }} -->
        <BListGroup>
            <BListGroupItem v-for="rdv in rdvs" :key="rdv.uuid" button @click="rdvSelected(rdv)">
                <h4>{{ rdv.title }}</h4>
                <!-- <small>{{ localeDateTime(rdv.start_date, rdv.start_time) }} -> {{ localeDateTime(rdv.end_date, rdv.end_time)
                }}</small> -->
                <small>{{ rdv.start_date}} {{  rdv.start_time }} -> {{ rdv.end_date}} {{  rdv.end_time }}
                </small>
                <!-- {{  rdv }} -->
                <br> {{ rdv.description }}
                <span v-if="rdv.distance != undefined"><br>{{ rdv.distance > 1 ? rdv.distance + " km" :
                    Math.floor(rdv.distance * 1000) + " m" }}</span>
                <AdresseView :coordinates="rdv.coordinates" />
            </BListGroupItem>

        </BListGroup>
        <!-- {{ rdvs }} -->
    </div>
</template>

<script>
import AdresseView from '@/components/AdresseView.vue'
export default {
    name: "RdvView",
    components: {
        AdresseView
    },
    created() {

    },
    methods: {
        localeDateTime(d, t) {
            return new Date(d + 'T' + t).toLocaleString()
        },
        rdvSelected(rdv) {
            this.$store.commit('core/centerToPoint', rdv.coordinates)
        },
        withDistances(rdvs) {

            let rdvsD = rdvs.map((r) => {
                var temp = Object.assign({}, r);
                if (r.coordinates != undefined && this.myPosition != undefined) {
                    // let x =  - u.position.coordinates[0]
                    // let y = this.myPosition[1] - u.position.coordinates[1]
                    const d = this.$getDistanceFromLatLonInKm(this.myPosition[0], this.myPosition[1], r.coordinates[0], r.coordinates[1]).toFixed(3);
                    temp.distance = d
                    // temp.adresse = this.adress(r.coordinates)
                }

                return temp;
            });
            return rdvsD.sort(function (a, b) {
                return a.distance - b.distance;
            });
        },


    },
    computed: {
        rdvs() {
            console.log('rdvs', this.rdvs)
            return this.withDistances(this.$store.state.core.rdvs)
        },
        myPosition() {
            return this.$store.state.core.myPosition
        },

    }
}
</script>

<style scoped></style>