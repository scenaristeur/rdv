<template>
  <div class="home">
    <!-- <MapComponent /> -->
    <WorldMap />
    <!-- <TimelineView /> -->
    <MenuComponent />
    <ProfileView />
    <WikipediaView v-if="view == 'wikipedia'" />
    <UsersView v-if="view == 'users'" />
    <RdvView v-if="view == 'rdv'" />
    <PostView v-if="view == 'post'" />
    <GraphView v-if="view == 'graph'" />
    <RdvUpdater />
    <UsersUpdater />

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
import UsersUpdater from '@/components/UsersUpdater.vue'
import WikipediaView from '@/views/WikipediaView.vue'
import MenuComponent from '@/components/MenuComponent.vue'
import PostView from '@/views/PostView.vue'
import GraphView from '@/views/GraphView.vue'

export default {
  name: 'MapView',
  components: {
    //MapView,
    // MapComponent,
    WorldMap,
    ProfileView,
    UsersView,
    RdvView,
    RdvUpdater,
    UsersUpdater,
    // TimelineView,
    WikipediaView,
    MenuComponent,
    PostView,
    GraphView
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
    places() {
      return this.$store.state.core.places
    },
  }

}
</script>
