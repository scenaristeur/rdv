<template>
  <div class="home">

    <MapComponent />
    <ProfileView/>
    <UsersView/>

  
  </div>
</template>

<script>
// @ is an alias to /src
import MapComponent from '@/components/MapComponent.vue'
import ProfileView from '@/components/ProfileView.vue'
import UsersView from '@/components/UsersView.vue'

export default {
  name: 'MapView',
  components: {
    MapComponent,
    ProfileView,
    UsersView
  },

}
</script>
