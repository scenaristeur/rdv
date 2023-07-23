import { createStore } from 'vuex'

export default createStore({
  state: {
    map: null
  },
  getters: {
  },
  mutations: {
    setMap (state, map) {
      state.map = map
  }
  },
  actions: {
  },
  modules: {
  }
})
