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

// 读取之前保存的服务器公开信息(如果有的话)
// router的钩子先于Vue生命周期执行,所以在Vue实例创建前读取内容
const hasState = localInfo.get('localInfo');
if (hasState) {
  store.dispatch('initState', hasState);
}

const vue = new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    
    // 没有本地数据则请求服务器基本信息
    if (!hasState) {
      this.$store.commit('progressStart');
      this.$store.dispatch('get', {
        target: 'base',
      }).then(({ data }) => this.$store.dispatch('initState', data))
        .catch(() => this.$router.replace('/error/1000'))
        .finally(() => this.$store.commit('progressDone'));
    }

  }
}).$mount('#app');

if (process.env.NODE_ENV === 'development') {
  window.vue = vue;
}
