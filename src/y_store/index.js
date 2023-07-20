import { syncedStore, getYjsDoc /*, observeDeep*/ } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";
//import { IndexeddbPersistence } from "y-indexeddb";
import { WebsocketProvider } from "y-websocket";
import { Awareness } from "y-protocols/awareness";

// (optional, define types for TypeScript)
// type Todo = { completed: boolean, title: string };

// Create your SyncedStore store
const shape = {
  // brains: [],
  // neurones: [],
  positions: {},
};
export const store = syncedStore(shape);
// export const observe = observeDeep()

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsDoc(store);
export const awareness = new Awareness(doc);
export const webrtcProvider = new WebrtcProvider("rdv", doc, {
  awareness,
  signaling: [
    //   //"wss://y-webrtc-signaling-eu.herokuapp.com",
    //   "wss://y-webrtc-signaling-us.herokuapp.com",
    //   "wss://signaling.yjs.dev",
    "wss://noosld-webrtc.glitch.me",
  ],
});

//export const indexDBprovider = new IndexeddbPersistence("rdv", doc);
export const websocketProvider = new WebsocketProvider(
  "wss://yjs-leveldb.glitch.me/rdv",
  "rdv",
  doc
);

webrtcProvider.on("status", (event) => {
  console.log("** webrtcProvider in y_store", event.status); // logs "connected" or "disconnected"
});

websocketProvider.on("status", (event) => {
  console.log("## websocketProvider in y_store", event.status); // logs "connected" or "disconnected"
});

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
