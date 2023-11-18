<template>
    <div>
[[ display calendar]]
        <BListGroup>
            <BListGroupItem v-for="rdv in rdvs" :key="rdv.uuid" button @click="rdvSelected(rdv)">
                <h4>{{ rdv.title }}</h4>
               <small>{{ rdv.start_date }} {{rdv.start_time  }} -> {{rdv.end_date  }} {{rdv.end_time  }}</small> 
               <br> {{ rdv.description }}
            </BListGroupItem>

        </BListGroup>
        <!-- {{ rdvs }} -->
    </div>
</template>

<script>

export default {
    name: "RdvView",
    created() {

    },
    methods: {
        rdvSelected(rdv){
            this.$store.commit('core/centerToPoint', rdv.coordinates)
        }

    },
    computed: {
        rdvs() {
            return this.$store.state.core.rdvs
        },

    }
}
</script>

<style scoped></style>