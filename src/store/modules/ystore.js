import * as Vue from "vue";
import { store as ystore, awareness } from "@/y_store";
import { enableVueBindings, observeDeep } from "@syncedstore/core";
enableVueBindings(Vue);



const rdvsUpdate = (e) => {
  console.log(e)
}

observeDeep(ystore.rdvs, rdvsUpdate)

const state = () => ({
  awareness: awareness,
  ystore: ystore,
});

const mutations = {
  // incrementLevel(state) {
  //   state.level = state.level + 1;
  //   console.log(state.level);
  // },
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
