<template>
  <div>
    <p>Clic droit sur la carte pour ajouter un rendez-vous.</p>

    <b-list-group class="scroll_list">
      <b-list-group-item
        v-for="rdv in rdvs"
        :key="rdv.uuid"
        button
        @click="rdvSelected(rdv)"
        href="#"
      >
        <b-container class="fluid">
          <b-row>
            <b-col cols="3" v-if="rdv.distance != undefined"
              ><small>{{
                rdv.distance > 1
                  ? Math.round(rdv.distance) + " km"
                  : Math.floor(rdv.distance * 1000) + " m"
              }}</small></b-col
            >
            <b-col cols="5">{{ rdv.title }}</b-col>
            <b-col cols="4"
              ><small>
                <b-button variant="success" @click.stop="ouvrir(rdv)" size="sm">
                  {{ display(rdv.start) }} <br />
                  {{ display(rdv.end) }}
                </b-button>
              </small></b-col
            >
          </b-row>
        </b-container>
        <div class="d-flex w-100 justify-content-between">


          <small>{{ rdv.tags }} </small>
        </div>

        <p class="mb-1">
          <small>{{ rdv.description }} </small>
        </p>

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
import AdresseView from "@/components/AdresseView.vue";
export default {
  name: "RdvView",
  components: {
    AdresseView,
  },
  methods: {
    rdvSelected(rdv) {
      this.$store.commit("core/centerToPoint", rdv.coordinates);
    },
    withDistances(rdvs) {
      let rdvsD = rdvs.map((r) => {
        var temp = Object.assign({}, r);
        if (r.coordinates != undefined && this.myPosition != undefined) {
          const d = this.$getDistanceFromLatLonInKm(
            this.myPosition[0],
            this.myPosition[1],
            r.coordinates[0],
            r.coordinates[1]
          ).toFixed(3);
          temp.distance = d;
        }
        return temp;
      });
      return rdvsD.sort(function (a, b) {
        return a.distance - b.distance;
      });
    },
    display(date) {
      return new Date(date).toLocaleString();
    },
    ouvrir(rdv) {
        let url = "https://calendar.google.com/calendar/render?action=TEMPLATE&dates="
        url+=new Date(rdv.start).toISOString().replace(/[^\w\s]/gi, '')+"/"+new Date(rdv.end).toISOString().replace(/[^\w\s]/gi, '');
        url+="&details="+rdv.description+"<br><br>"+rdv.tags
        url+="&location="+rdv.coordinates[1]+","+rdv.coordinates[0]
        url+="&text="+rdv.title
                
            window.open(url)
        }
  },

  computed: {
    rdvs() {
      console.log("rdvs", this.rdvs);
      return this.withDistances(this.$store.state.core.rdvs);
    },
    myPosition() {
      return this.$store.state.core.myPosition;
    },
  },
};
</script>

<style scoped>
.addToCalendar {
  background-color: #44c767;
  border-radius: 28px;
  border: 1px solid #18ab29;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 16px;
  padding: 16px 31px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #2f6627;
}
.addToCalendar:hover {
  background-color: #5cbf2a;
}
.addToCalendar:active {
  position: relative;
  top: 1px;
}
</style>
