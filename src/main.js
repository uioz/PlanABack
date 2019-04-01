import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import "./plugin/normalize";
import "./plugin/museui";
import "./plugin/fontawesome";
if (process.env.NODE_ENV === 'development'){
  require('./plugin/mock.js');
}

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
