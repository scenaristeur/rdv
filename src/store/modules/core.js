
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
  positionUpdated: null,
  wikipedia_api_url: "https://fr.wikipedia.org/w/api.php?origin=*",
  places: [],
  showProfile: false,
  posts:[],


  wikipedia_params: {
    //https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=37.7891838%7C-122.4033522&gsradius=10000&gslimit=100
    action: "query",
    list: "geosearch",
    gscoord: null, // lat + "|" + lon,
    prop: "coordinates|pageimages",
    gsradius: 10000,
    gslimit: 100,
    format: "json",
  },
});

const mutations = {
  // incrementLevel(state) {
  //   state.level = state.level + 1;
  //   console.log(state.level);
  // },
  setShowProfile(state, v) {
    state.showProfile = v
  },
  async updateMyPosition(state, p) {
    console.log("position update", p);
    state.myPosition = p;
    console.log("delay ", Date.now() - state.positionUpdated);
    if (Date.now() - state.positionUpdated > 10000) {
      state.positionUpdated = Date.now();
      awareness.setLocalStateField("position", {
        // Define a print name that should be displayed
        coordinates: p,
        updated: state.positionUpdated,
      });

    }
    },
async getWikipedia(state){
  let places = await this.dispatch("core/getWikipedia", state.myPosition);
  console.log(places);
  state.places = places
},
async removeWikipedia(state){
 
  state.places = []
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
  setPosts(state, posts) {
    state.posts = posts
  }
  // increment(state, payload) {
  //   state.counter = state.counter + payload;
  // },
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
  updateYstorePosts(context, post) {
    // context.commit("increment", payload);
    if (post.uuid == undefined) {
      post.uuid = uuidv4();
    }
    ystore.posts[post.uuid] = post;
  },
  async getWikipedia(context, position) {
    let params = context.state.wikipedia_params;
    let url = context.state.wikipedia_api_url;
    params.gscoord = position[1] + "|" + position[0];
    Object.keys(params).forEach(function (key) {
      url += "&" + key + "=" + params[key];
    });
    
    console.log("url", url);
      return fetch(url)
          .then(function (response) {
            console.log(response)
              return response.json();
          })
          .then(resp => {
              console.log(resp);
              return resp.query.geosearch;
          })
          .catch(function (error) {
              console.log(error);
          });

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
