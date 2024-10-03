<template>
  <div>
    <!-- rdvform {{ rdv }} -->

    <BModal v-model="showRdvForm" @ok="onAddRdv" size="lg">
      <div v-if="edit == false">
        Rdv non modifiable

        <b-button @click="aller" variant="primary" size="sm">Aller</b-button>
        <b-button @click="agenda" variant="primary" size="sm"
          >Agenda</b-button
        >
      </div>
      <div v-if="rdv != null">
        <!--    :style="'backgroundColor:'+rdv.color" -->
        <div role="group">
          <label for="input-live"><code>Titre:</code></label>
          <b-form-text id="input-live-help" v-if="stateTitle == false"
            >Un titre cool pour ton rdv.</b-form-text
          >
          <b-form-input
            id="input-live"
            v-model="rdv.title"
            :state="stateTitle"
            @input="titleState"
            :disabled="!edit"
            aria-describedby="input-live-help input-live-feedback"
            placeholder="Titre de ton rdv"
            autofocus
            trim
          ></b-form-input>

          <!-- This will only be shown if the preceding input has an invalid state -->
          <b-form-invalid-feedback id="input-live-feedback">
            entre 3 et 50 lettres
          </b-form-invalid-feedback>

          <!-- This is a form text block (formerly known as help block) -->
        </div>

        <label for="datePicker"
          ><code>Quand?</code>
          <small v-if="edit == true"><i>Durée limitée à 7 jours max</i></small></label
        >
        <VueDatePicker
          id="datePicker"
          v-model="date"
          range
          partial-range
          hide-input-icon
          max-range="7"
          :format-locale="fr"
          format="dd/MM, HH:mm"
          :min-date="new Date()"
          :max-date="new Date(new Date().setDate(new Date().getDate() + 15))"
          :disabled="!edit"
        />

        <label for="textarea"><code>Description:</code></label>
        <b-form-textarea
          id="textarea"
          v-model="rdv.description"
          placeholder="Description"
          rows="3"
          max-rows="6"
          :disabled="!edit"
        ></b-form-textarea>

        <!--     <BRow class="my-1" v-for="field in inputFields" :key="field.id">
              <BCol sm="3">
                <label :for="`type-${field.name}`"><code>{{ field.name }}</code>:</label>
              </BCol>
              <BCol sm="9">
                <BFormInput :disabled="!edit" :id="`type-${field.name}`" :type="field.type" v-model="rdv[field.id]"
                  v-bind:min="field.min" />
              </BCol>
            </BRow> -->
        <b-row>
          <b-col>
            <label for="color"><code>Couleur:</code></label>
            <b-form-input
              id="color"
              v-model="rdv.color"
              :disabled="!edit"
              type="color"
            ></b-form-input>
            <label for="color"><code>Tags:</code></label>
            <b-form-input
              id="input-live"
              v-model="rdv.tags"
              :disabled="!edit"
              aria-describedby="input-live-help input-live-feedback"
              placeholder="séparés par des virgules"
              trim
            ></b-form-input>
          </b-col>
          <!-- <b-col>
                        <label for="password"><code>Password:</code></label>
                        <b-form-input id="password" v-model="password" placeholder="password protect"
                            type="password"></b-form-input>
                    </b-col> -->
        </b-row>
        <!-- <div class="mt-2">Value: {{ rdv }}</div> -->
      </div>
    </BModal>
  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { fr } from "date-fns/locale";
// import sha256 from 'crypto-js/sha256';
//import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';
export default {
  name: "RdvForm",
  components: {
    VueDatePicker,
  },
  data() {
    return {
      showRdvForm: false,
      fr: fr,
      edit: true,
      date: null,
      stateTitle: false,
      // password: null
    };
  },
  methods: {
    onAddRdv() {
      // console.log(this.rdv, this.password)
      console.log(this.date);
      // console.log(date)
      if (this.date[1] == null) {
        this.date[1] = this.date[0];
      }
      this.rdv.start = this.date[0].toString();
      this.rdv.end = this.date[1].toString();
      // this.rdv.start_date = this.date[0].toLocaleDateString()
      // this.rdv.start_time = this.date[0].toLocaleTimeString()
      // this.rdv.end_date = this.date[1].toLocaleDateString()
      // this.rdv.end_time = this.date[1].toLocaleTimeString()
      // this.rdv.password = Base64.stringify(sha256(password.value));
      // password.value = ""
      //console.log(date_start, time_start, date_end, time_end)

      this.rdv.updated = Date.now();
      console.log(this.rdv);

      this.$store.dispatch("core/updateYstoreRdvs", this.rdv);

      // const feature = new Feature({
      //     geometry: new Geom.Point(this.rdv.coordinates),
      //     data: this.rdv
      // });
      // // console.log("feature1", feature)
      // if (edit.value == true) {
      //     markers.value.source.addFeature(feature);
      //     ystore.rdvs[this.rdv.uuid] = this.rdv
      // }
      // ystore.rdvs[this.rdv.uuid] != undefined ? delete ystore.rdvs[this.rdv.uuid] : ""
    },
    titleState() {
      this.stateTitle =
        this.edit != true ||
        (this.rdv.title && this.rdv.title.length > 2 && this.rdv.title.length < 51)
          ? true
          : false;
    },
    aller() {
      window.open(
        "https://www.google.com/maps/search/?api=1&query=" +
          this.rdv.coordinates[1] +
          "," +
          this.rdv.coordinates[0]
      );
    },
    agenda() {
      let rdv = this.rdv;
      let url = "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=";
      url +=
        new Date(rdv.start).toISOString().replace(/[^\w\s]/gi, "") +
        "/" +
        new Date(rdv.end).toISOString().replace(/[^\w\s]/gi, "");
      url += "&details=" + rdv.description + "<br><br>" + rdv.tags;
      url += "&location=" + rdv.coordinates[1] + "," + rdv.coordinates[0];
      url += "&text=" + rdv.title;

      window.open(url);
    },
  },
  watch: {
    rdv() {
      this.showRdvForm = this.rdv != null;
      if (this.rdv.start != undefined) {
        this.date = [this.rdv.start, this.rdv.end];
        console.log(this.date);
        this.edit = false;
      } else {
        this.edit = true;
      }
    },
  },
  computed: {
    rdv() {
      return this.$store.state.core.rdv;
    },
  },
};
</script>

<style scoped></style>
