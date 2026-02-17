import { createApp } from "vue";
import "./assets/styles/style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { router } from "./router";

const app = createApp(App);

const pinia = createPinia();

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

app.use(pinia);

app.use(router);

app.mount("#app");

