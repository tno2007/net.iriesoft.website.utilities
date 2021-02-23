import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);

import VueFormulate from "@braid/vue-formulate";
Vue.use(VueFormulate);

/*

import MyFormulateAutocomplete from "./common/vue-formulate-custom-fields/MyFormulateAutocomplete.vue";

Vue.component("MyFormulateAutocomplete", MyFormulateAutocomplete);

Vue.use(VueFormulate, {
  library: {
    autocomplete: {
      classification: "text",
      component: "MyFormulateAutocomplete",
    },
  },
});

*/

import VueMask from "v-mask";
Vue.use(VueMask);

// *******************************

import { BootstrapVue } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import "@braid/vue-formulate/themes/snow/snow.scss";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);

// ********************************

import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
