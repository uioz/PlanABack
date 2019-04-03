import Vue from 'vue';
import Vue2Storage from 'vue2-storage';

Vue.use(Vue2Storage, {
  prefix: 'app_',
  driver: 'local',
  ttl: 1000 * 60 * 10 // 10 minute
});

Vue.use(Vue2Storage);