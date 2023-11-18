<template>
    <div>
        <h4>Users</h4>
        {{ myPosition }} {{ awareness.clientID }}
        <!-- {{  users }} -->

        <BListGroup v-if="users.length > 0">
            
                <BListGroupItem v-for="u in users" :key="u.profile.clientID" href="#">
                    <h2>{{ u.profile.name }}</h2>
                    <!-- u.clientID {{ u.clientID }}
                <br>
                u.profile.clientID {{ u.profile.clientID }} -->

                    distance : {{ u.distance }}
                </BListGroupItem>
         

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
            this.users = this.withDistances(users)
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
                    let x = this.myPosition[0] - u.position.coordinates[0]
                    let y = this.myPosition[1] - u.position.coordinates[1]
                    temp.distance = Math.sqrt(x * x + y * y)
                }

                return temp;
            });
            return usersD
        }
    },
    computed: {
        myPosition() {
            return this.$store.state.core.myPosition
        },
    }

}
</script>

<style scoped></style>