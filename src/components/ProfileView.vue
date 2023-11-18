<template>
    <div>
        <div>
            <BButton @click="showProfile = !showProfile"> Profile</BButton>
            <BModal v-model="showProfile">


                {{ profile }}

                <BListGroup>
                    <BListGroupItem 
                    v-for="p in profiles" :key="p.id" href="#" :active="profile == p.id"
                    @click="changeProfile(p.id)"
                    >
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
            showProfile: false
        }
    },
    created() {
        this.updateInterests()
    },
    methods: {
        changeProfile(id){
            console.log(id)
            this.$store.commit('core/setProfile', id)
        },
        updateInterests() {
            console.log("update interests")
            awareness.setLocalStateField('interests', {
                // Define a print name that should be displayed
                like: this.profiles[this.profile]
            })
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
        }
    }
}
</script>

<style scoped></style>