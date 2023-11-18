// import Vue from 'vue'
// import idb from '@/api/idb-nodes';
// import * as Automerge from 'automerge'
// import { v4 as uuidv4 } from 'uuid';

const state = () => ({
  level: 0,
  profiles: [
    {
      id: 0,
      name: "js +bad",
      interests: ["js", "badminton", "velo"],
    },
    {
      id: 1,
      name: "js +tricot",
      interests: ["js", "tricot", "natation"],
    },
    {
      id: 2,
      name: "react + tricot",
      interests: ["react", "tricot", "tracteurs"],
    },
  ],
  profile: Math.floor(Math.random() * 3),
  myPosition: [],
  users: []
});

const mutations = {

  incrementLevel(state) {
    state.level = state.level + 1;
    console.log(state.level);
  },
  updateMyPosition(state, p){
    state.myPosition = p
  },
  setUsers(state,u){
    state.users = u
  },
  setProfile(state, id){
    state.profile = id
  }

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
