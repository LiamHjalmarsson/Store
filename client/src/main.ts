import { createApp } from "vue";
import "./assets/styles/style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { router } from "./router";

const app = createApp(App);

const pinia = createPinia();

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

pinia.use(piniaPluginPersistedstate);

app.use(pinia);

app.use(router);

app.mount("#app");

