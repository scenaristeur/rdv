import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import {store as ystore} from './y_store'
import store from './store'
import ToolsPlugin from "@/plugins/tools-plugin";

import BootstrapVue3 from "bootstrap-vue-3";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

import OpenLayersMap from "vue3-openlayers";
/* for debug
import OpenLayersMap, {
  type Vue3OpenlayersGlobalOptions,
} from "vue3-openlayers";
const options: Vue3OpenlayersGlobalOptions = {
  debug: true,
};

app.use(OpenLayersMap, options);
*/
import "vue3-openlayers/styles.css"; // vue3-openlayers version < 1.0.0-*

createApp(App)
.use(store)
.use(router)
.use(BootstrapVue3)
.use(ystore)
.use(ToolsPlugin,{store})
.use(OpenLayersMap /* options */)
.mount('#app')
