import Vue from 'vue';
import App from './App.vue';
import store from './store/store.js';
import router from './router.js';
import "./plugin/normalize.js";
import "./plugin/museui.js";
import "./plugin/fontawesome.js";
import localInfo from "./store/storage.js";


if (process.env.NODE_ENV === 'development') {
  require('./plugin/mock.js');
}

Vue.config.productionTip = false;

const vue = new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // 获取本地保存的对外公开的信息
    const hasState = localInfo.get('localInfo');
    if (hasState) {
      this.$store.commit('initState', hasState);
    } else {
      this.$store.commit('progressStart');
      // 没有本地数据则请求服务器基本信息
      this.$store.dispatch('get', {
        target: 'base',
      }).then(({ data }) => this.$store.commit('initState', data))
        .catch(() => this.$router.replace('/error/1000'))
        .finally(() => this.$store.commit('progressDone'));
    }

  }
}).$mount('#app');

if (process.env.NODE_ENV === 'development') {
  window.vue = vue;
}
