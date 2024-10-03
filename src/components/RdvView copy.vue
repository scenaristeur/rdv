<template>
    <div><p>Clic droit sur la carte pour ajouter un rendez-vous.</p>


        <b-list-group class="scroll_list">
            <b-list-group-item v-for="rdv in rdvs" :key="rdv.uuid" button @click="rdvSelected(rdv)" href="#" class="flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                   

                    <b class="mb-1">{{ rdv.title }}</b>
                 
                    <small>{{ rdv.tags }}  </small>
                    <b-badge variant="primary">
                   
                        {{ display(rdv.start)}} <br> {{ display(rdv.end)}} 
                       
                     </b-badge>
                </div>
    
                <p class="mb-1">
                    {{ rdv.description }} </p>
    
     
                    <span v-if="rdv.distance != undefined"><br>{{ rdv.distance > 1 ? Math.round(rdv.distance) + " km" :
                        Math.floor(rdv.distance * 1000) + " m" }}</span>
                   <AdresseView :coordinates="rdv.coordinates" /> 
              
            </b-list-group-item>
    
        </b-list-group>




<!-- 

        <BListGroup class="scroll_list">
            <BListGroupItem v-for="rdv in rdvs" :key="rdv.uuid" button @click="rdvSelected(rdv)">
                <h4>{{ rdv.title }}</h4>
                <small>{{ new Date(rdv.start).toLocaleString()}} -> {{ new Date(rdv.end).toLocaleString()}} 
                </small>
                <br> {{ rdv.description }} 
               <span>{{  rdv.tags }} </span> 
               <span v-if="rdv.distance != undefined"><br>{{ rdv.distance > 1 ? rdv.distance + " km" :
                    Math.floor(rdv.distance * 1000) + " m" }}</span>
               <AdresseView :coordinates="rdv.coordinates" />  
            </BListGroupItem>
        </BListGroup> -->
    </div>
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
        display(date) {
           return  new Date(date).toLocaleString()    },
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
