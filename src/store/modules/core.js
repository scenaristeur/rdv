// import Vue from 'vue'
// import idb from '@/api/idb-nodes';
// import * as Automerge from 'automerge'
import { v4 as uuidv4 } from "uuid";
import { awareness } from "@/y_store";

const state = () => ({
  level: 0,
  profiles: [],
  profile: null,
  myPosition: [],
  users: [],
  centerMe: true,
  centerPoint: [],
  view: "users",
  rdvs: [],
  counter: 0
});

const mutations = {
  incrementLevel(state) {
    state.level = state.level + 1;
    console.log(state.level);
  },
  updateMyPosition(state, p) {
    console.log("position update",p)
    state.myPosition = p;
    awareness.setLocalStateField('position', {
      // Define a print name that should be displayed
      coordinates: p,
      updated: Date.now()
  })
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
  centerToPoint(state, coordinates) {
    state.centerPoint = coordinates;
  },
  addProfile(state, p) {
    p.id = uuidv4();
    state.profiles.push(p);
  },
  setView(state, v) {
    state.view = v;
  },
  setRdvs(state, rdvs) {
    state.rdvs = rdvs;
  },
  increment(state, payload) {
    state.counter = state.counter + payload
  }
  // setConfig(state, c) {
  //   state.config = c
  // }
};

const actions = {
  increment(context, payload) {
    context.commit('increment', payload);
  }
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
