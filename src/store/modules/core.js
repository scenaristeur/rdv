// import Vue from 'vue'
// import idb from '@/api/idb-nodes';
// import * as Automerge from 'automerge'
import { v4 as uuidv4 } from "uuid";
import { store as ystore, awareness } from "@/y_store";

const state = () => ({
  level: 0,
  profiles: [],
  profile: null,
  myPosition: [],
  users: [],
  centerPoint: null,
  view: "users",
  rdvs: [],
  rdv: null,
  // counter: 0,
  positionUpdated : null
});

const mutations = {
  incrementLevel(state) {
    state.level = state.level + 1;
    console.log(state.level);
  },
  updateMyPosition(state, p) {
    console.log("position update", p);
    state.myPosition = p;

    if(Date.now()-state.positionUpdated > 10){
      state.positionUpdated = Date.now()
      awareness.setLocalStateField("position", {
        // Define a print name that should be displayed
        coordinates: p,
        updated: state.positionUpdated,
      });
    }
 
  },
  setUsers(state, u) {
    state.users = u;
  },
  setRdv(state, rdv) {
    if (rdv.uuid == undefined) {
      rdv.uuid = uuidv4();
    }
    if (rdv.author == undefined) {
      rdv.author = awareness.clientID;
    }
    state.rdv = rdv;
  },
  setProfiles(state, p) {
    state.profiles = p;
  },
  setProfile(state, id) {
    state.profile = id;
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
    state.counter = state.counter + payload;
  },
  // setConfig(state, c) {
  //   state.config = c
  // }
};

const actions = {
  increment(context, payload) {
    context.commit("increment", payload);
  },
  updateYstoreRdvs(context, rdv) {
    // context.commit("increment", payload);
    ystore.rdvs[rdv.uuid] = rdv;
  },
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
