<template>
    <div>
        <!-- <h4>Users</h4> -->
        <!-- {{ myPosition }} {{ awareness.clientID }} -->
        <!-- {{  users }} -->

        <BListGroup v-if="users.length > 0" class="scroll_list">
            <div>
                <BListGroupItem v-for="u in users" :key="u.profile.clientID" href="#" @click="userClicked(u)">
                    <h2>{{ u.profile.name }}</h2>
                    <!-- u.clientID {{ u.clientID }}
                    <br>
                    u.profile.clientID {{ u.profile.clientID }}
                    <br>
                    awareness.clientID : {{ awareness.clientID }} -->
                    <div class="row">
                        <div class="col">
                            <div class="user_color" :style="'width:20px;height:20px;background-color:' + u.profile.color" />
                        </div>
                        <div class="col" v-if="u.distance != undefined">
                            {{ u.distance > 1 ? u.distance + " km" : Math.floor(u.distance * 1000) + " m" }}
                        </div>
                        <div class="col">
                            <div
                                v-if="u.interests != undefined && u.interests.like != undefined && u.interests.like.interests != undefined && profiles.length > 0">
                                <BBadge v-for="i in  u.interests.like.interests" :key="i" :variant="getInterestVariant(i)">
                                    {{ i
                                    }}</BBadge>
                            </div>
                        </div>

                    </div>




                    <!-- {{ u.interests }} -->


                </BListGroupItem>
            </div>
        </BListGroup>
        <div v-else>
            Recherche des voisins
        </div>
    </div>
</template>

<script>

import { awareness } from "@/y_store";



export default {
    name: "UsersView",
    data() {
        return {
            users: [],
            awareness: awareness,
            updating: null
        }
    },

    created() {
        // console.log(ystore, awareness),


        awareness.on('change', (changes) => {
            console.log("--changes", changes)
            // Whenever somebody updates their awareness information,
            // we log all awareness information from all users.
            // console.log(Array.from(awareness.getStates().values()))
            this.updateUsers(Array.from(awareness.getStates().values()).filter((u) => u.profile != undefined && u.profile.clientID != awareness.clientID))

        })
        //this.updateUsers(Array.from(awareness.getStates().values()).filter((u) => u.profile != undefined && u.profile.clientID != awareness.clientID))
    },
    methods: {
        userClicked(user) {
            console.log(user)
            if (user.position != undefined) {
                this.$store.commit('core/centerToPoint', user.position.coordinates)
            }

        },

        updateUsers(users) {

            if (this.updating == null || Date.now() - this.updating > 10000) {
                console.log('UPDATE USERS'/*, users,Date.now(), this.updating,  Date.now() - this.updating*/ )
                this.users = this.withDistances(users).sort(function (a, b) {
                    return a.distance - b.distance;
                });
                this.$store.commit('core/setUsers', this.users)
                this.updating = Date.now()
            }
            // else{
            //     console.log("updated less than 10 s")
            // }


            // users.forEach(user => {
            //     try{
            //         console.log(user.profile.name, user.position)
            //     }catch(e){
            //         console.log(e)
            //     }

            // }); 
        },
        withDistances(users) {

            let usersD = users.map((u) => {
                var temp = Object.assign({}, u);
                if (u.position != undefined && this.myPosition != undefined) {
                    // let x =  - u.position.coordinates[0]
                    // let y = this.myPosition[1] - u.position.coordinates[1]
                    const d = this.$getDistanceFromLatLonInKm(this.myPosition[0], this.myPosition[1], u.position.coordinates[0], u.position.coordinates[1]).toFixed(3);
                    temp.distance = d
                }

                return temp;
            });
            return usersD
        },



        getInterestVariant(i) {
            let p = this.profiles.find((p) => p.id == this.profile)
            return p != undefined && p.interests.includes(i) ? 'info' : 'light'

        }
    },
    computed: {
        myPosition() {
            return this.$store.state.core.myPosition
        },
        profiles() {
            return this.$store.state.core.profiles
        },
        profile() {
            return this.$store.state.core.profile
        },
    }

}
</script>

<style scoped>
/* .user_color{
    width: "20px";
    height: "20px";
} */
</style>