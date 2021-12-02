import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './index.css'
import Toaster from "@meforma/vue-toaster";
import vClickOutside from "click-outside-vue3"



createApp(App)
    .use(store)
    .use(router)
    .use(Toaster)
    .use(vClickOutside)
    .mount('#app');
