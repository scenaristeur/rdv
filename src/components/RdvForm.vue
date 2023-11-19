<template>
    <div>
        rdvform {{ rdv }}

        <BModal v-model="showRdvForm" @ok="onAddRdv" size="lg">
            <div v-if="rdv != null">
                <!--    :style="'backgroundColor:'+rdv.color" -->
                <label for="datePicker"><code>When ?</code> <small v-if="edit == true"><i>7 days max</i></small></label>
                <VueDatePicker id="datePicker" v-model="date" range partial-range max-range="7" :format-locale="fr"
                    format="Pp" :min-date="new Date()" :max-date="new Date(new Date().setDate(new Date().getDate() + 15))"
                    :disabled="!edit" />

                <div role="group">
                    <label for="input-live"><code>Title:</code></label>
                    <b-form-input id="input-live" v-model="rdv.title" :state="stateTitle" @input="titleState"
                        :disabled="!edit" aria-describedby="input-live-help input-live-feedback" placeholder="Title"
                        trim></b-form-input>

                    <!-- This will only be shown if the preceding input has an invalid state -->
                    <b-form-invalid-feedback id="input-live-feedback">
                        Enter at least 3 and less than 50 letters
                    </b-form-invalid-feedback>

                    <!-- This is a form text block (formerly known as help block) -->
                    <b-form-text id="input-live-help">A cool title for your event.</b-form-text>
                </div>


                <label for="textarea"><code>Description:</code></label>
                <b-form-textarea id="textarea" v-model="rdv.description" placeholder="Description" rows="3" max-rows="6"
                    :disabled="!edit"></b-form-textarea>

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
                        <label for="color"><code>Color:</code></label>
                        <b-form-input id="color" v-model="rdv.color" :disabled="!edit" type="color"></b-form-input>
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
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { fr } from 'date-fns/locale';
// import sha256 from 'crypto-js/sha256';
//import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';
export default {
    name: "RdvForm",
    components: {
        VueDatePicker
    },
    data() {
        return {
            showRdvForm: false,
            fr: fr,
            edit: true,
            date: null,
            stateTitle: false,
           // password: null

        }
    },
    methods: {
        onAddRdv ()  {
            // console.log(this.rdv, this.password)
            console.log(this.date)
            // console.log(date)
            if (this.date[1] == null) { this.date[1] = this.date[0] }
            this.rdv.date = this.date
            this.rdv.start_date = this.date[0].toLocaleDateString()
            this.rdv.start_time = this.date[0].toLocaleTimeString()
            this.rdv.end_date = this.date[1].toLocaleDateString()
            this.rdv.end_time = this.date[1].toLocaleTimeString()
            // this.rdv.password = Base64.stringify(sha256(password.value));
            // password.value = ""
            //console.log(date_start, time_start, date_end, time_end)
      

            this.rdv.updated = Date.now()
            console.log(this.rdv)

            this.$store.dispatch('core/updateYstoreRdvs',this.rdv)


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
        titleState(){
             this.stateTitle = this.edit != true || (this.rdv.title.length > 2 && this.rdv.title.length < 51) ? true : false

        }
    },
    watch: {
        rdv() {
            this.showRdvForm = this.rdv != null
            if(this.rdv.date != undefined){
                console.log(this.rdv.date)
            }
            }
    },
    computed: {
        rdv() {
            return this.$store.state.core.rdv
        },
    
    }
}
</script>

<style scoped></style>