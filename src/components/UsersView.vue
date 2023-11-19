<template>
    <div>
        <!-- <h4>Users</h4> -->
        <!-- {{ myPosition }} {{ awareness.clientID }} -->
        <!-- {{  users }} -->

        <BListGroup class="scroll_list">
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
   
    </div>
</template>

<script>





export default {
    name: "UsersView",
     methods: {
        userClicked(user) {
            console.log(user)
            if (user.position != undefined) {
                this.$store.commit('core/centerToPoint', user.position.coordinates)
            }

        },

        getInterestVariant(i) {
            let p = this.profiles.find((p) => p.id == this.profile)
            return p != undefined && p.interests.includes(i) ? 'info' : 'light'
        }
    },
    computed: {
        // myPosition() {
        //     return this.$store.state.core.myPosition
        // },
        profiles() {
            return this.$store.state.core.profiles
        },
        profile() {
            return this.$store.state.core.profile
        },
        users() {
            return this.$store.state.core.users
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