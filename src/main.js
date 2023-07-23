import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
//import router from './router'
import {store as ystore} from './y_store'
import store from './store'


//import '/ol/src/ol.css'

createApp(App)
.use(store)
//.use(router)
.use(ystore)

.mount('#app')
