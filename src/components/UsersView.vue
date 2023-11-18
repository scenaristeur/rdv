<template>
    <div>
        <!-- <h4>Users</h4> -->
        <!-- {{ myPosition }} {{ awareness.clientID }} -->
        <!-- {{  users }} -->

        <BListGroup v-if="users.length > 0" class="users_list">
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
                        <div class="col">
                            distance : {{ u.distance > 1 ? u.distance + " km" : Math.floor(u.distance * 1000) + " m" }}
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
import * as Vue from "vue";
import { store as ystore, awareness } from "@/y_store";
import { enableVueBindings, observeDeep } from "@syncedstore/core";
enableVueBindings(Vue);


export default {
    name: "UsersView",
    data() {
        return {
            users: [],
            awareness: awareness
        }
    },

    created() {
        // console.log(ystore, awareness),

        observeDeep(ystore.rdvs, this.rdvsUpdate)
        awareness.on('change', () /*changes */ => {
            // console.log("changes", changes)
            // Whenever somebody updates their awareness information,
            // we log all awareness information from all users.
            // console.log(Array.from(awareness.getStates().values()))
            this.updateUsers(Array.from(awareness.getStates().values()).filter((u) => u.profile != undefined && u.profile.clientID != awareness.clientID))

        })
    },
    methods: {
        userClicked(user) {
            console.log(user)
            if (user.position != undefined) {
                this.$store.commit('core/centerToUser', user.position.coordinates)
            }

        },
        rdvsUpdate(e) {
            console.log("RDVUPDATE", e)
        },
        updateUsers(users) {
            console.log('UPDATE USERS', users)
            this.users = this.withDistances(users).sort(function (a, b) {
                return a.distance - b.distance;
            });
            this.$store.commit('core/setUsers', this.users)
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
                if (u.position != undefined) {
                    // let x =  - u.position.coordinates[0]
                    // let y = this.myPosition[1] - u.position.coordinates[1]
                    const d = this.getDistanceFromLatLonInKm(this.myPosition[0], this.myPosition[1], u.position.coordinates[0], u.position.coordinates[1]).toFixed(3);
                    temp.distance = d
                }

                return temp;
            });
            return usersD
        },
        getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
            // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
            var R = 6371; // Radius of the earth in km
            var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
            var dLon = this.deg2rad(lon2 - lon1);
            var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2)
                ;
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in km
            return d;
        },

        deg2rad(deg) {
            return deg * (Math.PI / 180)
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
.users_list {
    height: 45vh;
    overflow-y: scroll;
    background-color: black;
    padding: 1px;
}

/* .user_color{
    width: "20px";
    height: "20px";
} */
</style>