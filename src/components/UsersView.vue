<template>
    <div>
        <!-- <h4>Users</h4> -->
        <!-- {{ myPosition }} {{ awareness.clientID }} -->
        <!-- {{  users }} -->

        <BListGroup v-if="users.length > 0" class="users_list">
            <div >
                <BListGroupItem v-for="u in users" :key="u.profile.clientID" href="#">
                    <h2>{{ u.profile.name }}</h2>
                    <!-- u.clientID {{ u.clientID }}
                <br>
                u.profile.clientID {{ u.profile.clientID }} -->

                    distance : {{ u.distance > 1 ? u.distance + " km" : Math.floor(u.distance * 1000) + " m" }}
                    <!-- interests  -->
                    <!-- {{ u.interests }} -->
                    <BBadge v-for="i in  u.interests.like.interests" :key="i"
                        :variant="profiles[profile].interests.includes(i) ? 'info' : 'light'">{{ i }}</BBadge>
                    <!-- <BBadge variant="light">Light</BBadge> -->
                    <!-- {{ profiles[profile].interests }} -->
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
        awareness.setLocalStateField('profile', {
            // Define a print name that should be displayed
            name: 'user_' + Date.now(),
            // Define a color that should be associated to the user:
            color: '#ffb61e', // should be a hex color
            clientID: awareness.clientID
        })
        observeDeep(ystore.rdvs, this.rdvsUpdate)
        awareness.on('change', () /*changes */ => {
            // console.log("changes", changes)
            // Whenever somebody updates their awareness information,
            // we log all awareness information from all users.
            // console.log(Array.from(awareness.getStates().values()))
            this.updateUsers(Array.from(awareness.getStates().values()).filter((u) => u.profile.clientID != awareness.clientID))
        })
    },
    methods: {
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
</style>