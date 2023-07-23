import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
//import router from './router'
//import {store as ystore} from './y_store'
import store from './store'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'



//import '/ol/src/ol.css'

createApp(App).use(Quasar, quasarUserOptions)
.use(store)
//.use(router)
//.use(ystore)

.mount('#app')
