import Vue from 'vue';
import App from './App.vue';
import store from './store/store.js';
import router from './router.js';
import "./plugin/normalize.js";
import "./plugin/museui.js";
import "./plugin/fontawesome.js";

if (process.env.VUE_APP_MOCK === 'true') {
  require('./plugin/mock.js');
}

Vue.config.productionTip = false;

const vue = new Vue({
  router,
  store,
  render: h => h(App),
  created() {

    // 拉取服务器基本信息
    this.$store.commit('progressStart');
    this.$store.dispatch('requestBaseInfo').finally(() => this.$store.commit('progressDone'));

  }
}).$mount('#app');

if (process.env.NODE_ENV === 'development') {
  window.vue = vue;
}
