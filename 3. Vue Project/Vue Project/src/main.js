import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import store from "./store";
import userStore from "./store/modules/userStore";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  async beforeCreate() {
    let token = sessionStorage.getItem("access-token");
    if (userStore.state.userInfo == null && token) {
      await userStore.dispatch("getUserInfo", token);
    }
  },
  render: (h) => h(App),
}).$mount("#app");
