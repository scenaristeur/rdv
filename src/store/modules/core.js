// import Vue from 'vue'
// import idb from '@/api/idb-nodes';
// import * as Automerge from 'automerge'
import { v4 as uuidv4 } from "uuid";

const state = () => ({
  level: 0,
  profiles: [],
  profile: null,
  myPosition: [],
  users: [],
  centerMe: true,
  centerUser: [],
});

const mutations = {
  incrementLevel(state) {
    state.level = state.level + 1;
    console.log(state.level);
  },
  updateMyPosition(state, p) {
    state.myPosition = p;
  },
  setUsers(state, u) {
    state.users = u;
  },
  setProfiles(state, p) {
    state.profiles = p;
  },
  setProfile(state, id) {
    state.profile = id;
  },
  centerMe(state, v) {
    state.centerMe = v;
  },
  centerToUser(state, coordinates) {
    state.centerUser = coordinates;
  },
  addProfile(state, p) {
    p.id = uuidv4();
    state.profiles.push(p);
  },

  // setConfig(state, c) {
  //   state.config = c
  // }
};

const actions = {
  // async newDoc(context){
  //   let doc = Automerge.init()
  //   context.commit('setDoc', doc)
  // },
  // addItem(context, text) {
  //   console.log(context.state.doc)
  //   let newDoc = Automerge.change(context.state.doc, doc => {
  //     if (!doc.items) doc.items = []
  //     doc.items.push({ text, done: false })
  //   })
  //   context.commit('updateDoc', newDoc)
  // }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
