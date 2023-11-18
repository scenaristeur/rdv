<template>
    <div>
        <div>
            <BButton @click="showProfile = !showProfile"> Profile</BButton>
            <BButton @click="followMe"> {{ centerMe == true ? "don't follow me": "follow me" }}</BButton>
            <BModal v-model="showProfile" @ok="updateUser">

                <BFormInput v-model="user.name" placeholder="username"/>
                <BFormInput v-model="user.color" type="color" />
                {{ profile }}

                <BListGroup>
                    <BListGroupItem v-for="p in profiles" :key="p.id" href="#" :active="profile == p.id"
                        @click="changeProfile(p.id)">
                        {{ p.name }}
                    </BListGroupItem>

                </BListGroup>

            </BModal>
        </div>
    </div>
</template>

<script>
import { awareness } from "@/y_store";
export default {
    name: "ProfileView",
    data() {
        return {
            showProfile: false,
            user: {
                name: 'user_' + Date.now(),
                // Define a color that should be associated to the user:
                color: '#ffb61e', // should be a hex color
                clientID: awareness.clientID
            }
        }
    },
    created() {
        let user = JSON.parse(localStorage.getItem('rdv_user'))
        // verif todo
        console.log("localstorage user",user)
        if(user && user.name && user.color){
            this.user = user
        }
       
        awareness.setLocalStateField('profile', this.user)
        this.updateInterests()
    },
    methods: {
        updateUser() {
            console.log("User", this.user)
            awareness.setLocalStateField('profile', this.user)
            localStorage.setItem('rdv_user', JSON.stringify(this.user))
        },
        changeProfile(id) {
            console.log(id)
            this.$store.commit('core/setProfile', id)
        },
        updateInterests() {
            console.log("update interests")
            awareness.setLocalStateField('interests', {
                // Define a print name that should be displayed
                like: this.profiles[this.profile]
            })
        },
        followMe(){
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