import Vue2Storage from 'vue2-storage';

const noop = function () {
  
};

Vue2Storage(noop, {
  prefix: 'app_',
  driver: 'local',
  ttl: 1000 * 60 * 10 // 10 minute
});


// get a storage instance that not include Vue-prototype
export default noop.prototype.$storage;