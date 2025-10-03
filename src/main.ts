import { createApp } from "vue";
import { createPinia } from 'pinia';

import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.css";
import './assets/vendor/bootstrap-icons/bootstrap-icons.min.css'

import "./style.css";

import App from "./App.vue";
import router from "./router";
import VueCountdown from '@chenfengyuan/vue-countdown';

import "bootstrap/dist/js/bootstrap.bundle.js";
import "./services/commonService/common";

const app = createApp(App);
app.component('VueCountdown', VueCountdown);
app.use(createPinia());
app.use(router);
app.mount("#app");
