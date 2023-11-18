<template>
   

        <div>

<!-- profiles: {{  profiles }}
<br>
profile {{ profile }} -->


            <BButton @click="showProfile = !showProfile" variant="info"> Profil</BButton>
            <BButton @click="followMe" :variant="centerMe == true ? 'outline-warning' : 'outline-success'"> {{ centerMe ==
                true ? "don't follow me" : "follow me" }}</BButton>
            <BButton @click="addRdv" variant="success"> rdv</BButton>
            <BModal v-model="showProfile" @ok="updateUser">
                <BForm>
                    <div class="row">
                        <label class="col-form-label col-2" for="inline-form-input-name">Nom</label>
                        <div class="col-8">
                            <BFormInput id="inline-form-input-name" class="mb-2 me-sm-2 mb-sm-0" v-model="user.name"
                                placeholder="username" />
                        </div>
                        <div class="col-2">
                            <BFormInput v-model="user.color" type="color" />
                        </div>
                    </div>


                    <div class="row">
                        <label class="col-form-label col-2" for="inline-form-input-profile">Profil</label>
                        <div class="col-8">
                            <BFormInput id="inline-form-input-profile" v-model="profile_name" placeholder="profile name" />
                        </div>
                        <div class="col-2">
                            <BButton @click="addProfile"> +</BButton>
                        </div>
                    </div>



                    {{ profile }}

                    <BListGroup>
                        <BListGroupItem v-for="p in profiles" :key="p.id" href="#" :active="profile == p.id"
                            @click="changeProfile(p.id)">
                            <h6 style="margin-bottom: 30px;">{{ p.name }}</h6>
                            <!-- {{ p.interests }} -->


                            <button v-for="i in p.interests" :key="i" type="button" class="btn btn-dark position-relative"
                                style="margin-right:'5px'">
                                {{ i }}
                                <span
                                    class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"
                                    @click="remove_interest({ profil: p.id, interest: i })">
                                    X
                                </span>
                            </button>
                            <div class="row" v-if="p.interests.length <5">
                                <label class="col-form-label col-2" for="inline-form-input-profile">intérêt</label>
                                <div class="col-8">
                                    <BFormInput v-model="new_interest" :value="new_interest" placeholder="nouvel interêt"
                                        @change="addInteret({ profil: p.id, })" />
                                </div>
                                <div class="col-2">
                                    <BButton @click="addInteret({ profil: p.id, })"> +</BButton>
                                </div>
                            </div>




                            <!-- <BFormInput v-model="p.interests" placeholder="centres d'interets séparés par une virgule" /> -->
                            <!-- <SimpleTypeahead id="typeahead_id" placeholder="ajoute des centres d'intérêt"
                                :items="['One', 'Two', 'Three']" :minInputLength="1" v-model="p.interests"
                                :itemProjection="itemProjectionFunction" @selectItem="selectItemEventHandler"
                                @onInput="onInputEventHandler" @onFocus="onFocusEventHandler" @onBlur="onBlurEventHandler">
                            </SimpleTypeahead> -->

                        </BListGroupItem>

                    </BListGroup>
                </BForm>

            </BModal>
        </div>
  
</template>

<script>
import { awareness } from "@/y_store";
// import SimpleTypeahead from 'vue3-simple-typeahead'
// import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'


export default {
    name: "ProfileView",
    // components: {
    //     SimpleTypeahead
    // },
    data() {
        return {
            showProfile: false,
            user: {
                name: 'user_' + Date.now(),
                // Define a color that should be associated to the user:
                color: '#ffb61e', // should be a hex color
                clientID: awareness.clientID
            },
            profile_name: "",
            interests: "",
            new_interest: ""
        }
    },
    created() {
        let user = JSON.parse(localStorage.getItem('rdv_user'))
        // verif todo
        console.log("localstorage user", user)
        if (user && user.name && user.color) {
            this.user = user
            let interests = JSON.parse(localStorage.getItem('rdv_user_interests'))
            if(interests != undefined){
            console.log("from localstorage", interests.profiles, interests.profile)
            this.$store.commit('core/setProfiles', interests.profiles)
            this.$store.commit('core/setProfile', interests.profile)
        }
        }
        // if(user.clientID) awareness.clientID = user.clientID

        awareness.setLocalStateField('profile', this.user)
        this.updateInterests()
    },
    methods: {
        addInteret(data) {
            if (this.new_interest.trim().length > 0) {
                console.log(this.new_interest, data)
                let p = this.profiles.find((p) => p.id == data.profil)
                p.interests.push(this.new_interest)
                this.new_interest = ""
                console.log(p)
            } else {
                alert("Ajoutez un centre d'intérêts")
            }
        },
        remove_interest(data) {
            console.log("remove", data.interest)
            let p = this.profiles.find((p) => p.id == data.profil)
            p.interests = p.interests.filter(i => i != data.interest)
        },
        onInputEventHandler(e) {
            console.log(e)
            console.log(this.interests)
        },
        addProfile() {
            if (this.profile_name.trim().length > 0) {
                let profil = {
                    name: this.profile_name,
                    interests: []
                }
                this.$store.commit('core/addProfile', profil)
                this.profile_name = ""
            } else {
                alert("ajoutez un nom de profil")
            }
        },
        addRdv() {
            console.log('add rdv')
        },
        updateUser() {
            console.log("User", this.user)
            awareness.setLocalStateField('profile', this.user)
            localStorage.setItem('rdv_user', JSON.stringify(this.user))
            this.updateInterests()
        },
        changeProfile(id) {
            console.log(id)
            this.$store.commit('core/setProfile', id)
        },
        updateInterests() {
            console.log("update interests")
            awareness.setLocalStateField('interests', {
                // Define a print name that should be displayed
                like: this.profiles.find((p) => p.id == this.profile)
            })
            localStorage.setItem('rdv_user_interests', JSON.stringify({ profiles: this.profiles, profile: this.profile }))
        },
        followMe() {
            console.log(this.centerMe)
            this.$store.commit('core/centerMe', !this.centerMe)
        }
    },
    watch: {
        profiles() {
            this.updateInterests()
        },
        profile() {
            this.updateInterests()
        }
    },
    computed: {
        profiles() {
            return this.$store.state.core.profiles
        },
        profile() {
            return this.$store.state.core.profile
        },
        centerMe() {
            return this.$store.state.core.centerMe
        },
    }
}
</script>

<style scoped></style>