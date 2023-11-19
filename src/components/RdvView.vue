<template>
        <BListGroup class="scroll_list">
            <BListGroupItem v-for="rdv in rdvs" :key="rdv.uuid" button @click="rdvSelected(rdv)">
                <h4>{{ rdv.title }}</h4>
                <small>{{ new Date(rdv.start).toLocaleString()}} -> {{ new Date(rdv.end).toLocaleString()}} 
                </small>
                <br> {{ rdv.description }}
                <span v-if="rdv.distance != undefined"><br>{{ rdv.distance > 1 ? rdv.distance + " km" :
                    Math.floor(rdv.distance * 1000) + " m" }}</span>
                <AdresseView :coordinates="rdv.coordinates" />
            </BListGroupItem>
        </BListGroup>
</template>

<script>
import AdresseView from '@/components/AdresseView.vue'
export default {
    name: "RdvView",
    components: {
        AdresseView
    },
    methods: {
        rdvSelected(rdv) {
            this.$store.commit('core/centerToPoint', rdv.coordinates)
        },
        withDistances(rdvs) {
            let rdvsD = rdvs.map((r) => {
                var temp = Object.assign({}, r);
                if (r.coordinates != undefined && this.myPosition != undefined) {
                    const d = this.$getDistanceFromLatLonInKm(this.myPosition[0], this.myPosition[1], r.coordinates[0], r.coordinates[1]).toFixed(3);
                    temp.distance = d
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
