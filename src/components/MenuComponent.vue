<template>
    <div>
        <b-button-group>
            <b-button @click="onShowProfile" variant="info"> Profil</b-button>
            <b-button @click="setView('users')">Users</b-button>
            <b-button @click="setView('rdv')">Rdv</b-button>
            <b-button @click="setView('wikipedia')">Lieux</b-button>
            <b-button @click="setView('post')">Post</b-button>
            <b-button @click="setView('graph')">graph</b-button>
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
    }
</script>

<style lang="scss" scoped>

</style>