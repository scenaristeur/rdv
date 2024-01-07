<template>
    <div>
        <b-button-group>
            <BButton @click="onShowProfile" variant="info"> Profil</BButton>
            <!-- <BButton @click="addRdv" variant="success"> rdv</BButton> -->

        </b-button-group>&nbsp;&nbsp;&nbsp;
        <b-button-group>
            <b-button @click="setView('users')">Users</b-button>
            <b-button @click="setView('rdv')">Rdv</b-button>
            <b-button @click="setView('wikipedia')">Lieux</b-button>
            <b-button @click="setView('post')">post</b-button>
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