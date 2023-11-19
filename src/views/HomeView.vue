<template>
  <div class="home">
    <!-- <MapComponent /> -->
    <WorldMap :value="view" :users="users" :rdvs="rdvs"/>
<!-- <TimelineView /> -->
    <ProfileView />
    <UsersView v-if="view == 'users'" />
    <RdvView v-if="view == 'rdv'" />
    <RdvUpdater />

  </div>
</template>

<script>
// @ is an alias to /src
import WorldMap from '@/views/WorldMap.vue'
// import TimelineView from '@/views/TimelineView.vue'
// import MapComponent from '@/components/MapComponent.vue'
import ProfileView from '@/components/ProfileView.vue'
import UsersView from '@/components/UsersView.vue'
import RdvView from '@/components/RdvView.vue'
import RdvUpdater from '@/components/RdvUpdater.vue'

export default {
  name: 'MapView',
  components: {
    //MapView,
    // MapComponent,
    WorldMap,
    ProfileView,
    UsersView,
    RdvView, RdvUpdater,
    // TimelineView
  },
  computed: {
    view() {
      return this.$store.state.core.view
    },
    users() {
      return this.$store.state.core.users
    },
    rdvs() {
      return this.$store.state.core.rdvs
    },
  }

}
</script>
