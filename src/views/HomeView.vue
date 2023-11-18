<template>
  <div class="home">

    <MapComponent />
    <ProfileView />
    <UsersView v-if="view == 'users'" />
    <RdvView v-if="view == 'rdv'" />
    <RdvUpdater />

  </div>
</template>

<script>
// @ is an alias to /src
import MapComponent from '@/components/MapComponent.vue'
import ProfileView from '@/components/ProfileView.vue'
import UsersView from '@/components/UsersView.vue'
import RdvView from '@/components/RdvView.vue'
import RdvUpdater from '@/components/RdvUpdater.vue'

export default {
  name: 'MapView',
  components: {
    MapComponent,
    ProfileView,
    UsersView,
    RdvView, RdvUpdater
  },
  computed: {
    view() {
      return this.$store.state.core.view
    },
  }

}
</script>
