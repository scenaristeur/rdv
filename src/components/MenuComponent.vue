<template>
    <div>     
        <b-button-group>
            <b-button @click="setView('rdv')" variant="outline-primary" :pressed="view == 'rdv'">Rdv</b-button>
           <b-button @click="setView('users')" variant="outline-primary" :pressed="view == 'users'">Users</b-button>

            <b-button @click="setView('post')" variant="outline-primary" :pressed="view == 'post'">Post</b-button>
            <b-button @click="setView('graph')" variant="outline-primary" :pressed="view == 'graph'">graph</b-button>
            <b-button @click="setView('wikipedia')" variant="outline-primary" :pressed="view == 'wikipedia'">wkpedia</b-button>
            <b-button @click="onShowProfile" variant="outline-primary" :pressed="view == 'profile'"> Profil</b-button>
            <!-- <b-button disabled>Calendar</b-button> -->
        </b-button-group>
    </div>
</template>

<script>

    export default {
        name: "MenuComponent",
        methods: {
            setView(v) {
            this.$store.commit('core/setView', v)
        },
        onShowProfile() {
            this.$store.commit('core/setShowProfile',true)
        }
        }
        ,
        computed: {
            view() {
                return this.$store.state.core.view
            }
        }   
    }
</script>

<style lang="scss" scoped>

</style>