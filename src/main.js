import Vue from 'vue';
import App from './App.vue';
import store from './store/store.js';
import router from './router.js';
import "./plugin/normalize.js";
import "./plugin/museui.js";
import "./plugin/fontawesome.js";
import Message from "./plugin/musemessage.js";

if (process.env.VUE_APP_MOCK === 'true') {
  require('./plugin/mock.js');
}

Vue.config.productionTip = false;

const vue = new Vue({
  router,
  store,
  render: h => h(App),
  created() {

    // store 会同步且先于 vue 加载
    // baseInfo 基于 sessionStorage 存储, 刷新后不丢失
    // 如果有数据说明不是第一次获取服务器数据
    if (this.$store.state.baseInfo) {
      return;
    }

    // 拉取服务器基本信息
    this.$store.commit('progressStart');
    this.$store.dispatch('requestBaseInfo')
      .then(({ systemMessage }) => {
        if (typeof systemMessage === 'string' && systemMessage.length >= 1) {
          // 提示 message
          Message.alert(systemMessage, '通知');
        }
      })
      .finally(() => this.$store.commit('progressDone'));

  }
}).$mount('#app');

if (process.env.NODE_ENV === 'development') {
  window.vue = vue;
}
