<template>
   <span></span>
</template>

<script>
import { awareness } from "@/y_store";
export default {
    name: "UsersUpdater",
    data() {
        return {
           // updating: null
        }
    },
    created() {
        awareness.on('change', (changes) => {
            console.log("--changes", changes)
            // Whenever somebody updates their awareness information,
            // we log all awareness information from all users.
            // console.log(Array.from(awareness.getStates().values()))
            this.updateUsers(Array.from(awareness.getStates().values()).filter((u) => u.profile != undefined && u.profile.clientID != awareness.clientID))

        })
        this.updateUsers(Array.from(awareness.getStates().values()).filter((u) => u.profile != undefined && u.profile.clientID != awareness.clientID))

    },
    methods: {
        updateUsers(users) {

           // if (this.updating == null || Date.now() - this.updating > 10000) {
                console.log('UPDATE USERS'/*, users,Date.now(), this.updating,  Date.now() - this.updating*/)
                this.users = this.withDistances(users).sort(function (a, b) {
                    return a.distance - b.distance;
                });
                this.$store.commit('core/setUsers', this.users)
            //     this.updating = Date.now()
            // }
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
    },
    computed: {
        myPosition() {
            return this.$store.state.core.myPosition
        },
    }
}
</script>

<style scoped></style>