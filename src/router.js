import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/index/index";
import Store from "./store/store.js";

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/login',
      meta: {
        fullContent: true
      },
      component: () => import(/* webpackChunkName: "login" */ './views/login/login.vue')
    },
    {
      path: '/error/:code',
      component: () => import(/* webpackChunkName: "error" */ './views/error/error.vue')
    },
    {
      path: '/auth/login',
      component: () => import(/* webpackChunkName: "auth-login" */ './views/auth/login.vue')
    },
    {
      path: '/test',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "test" */ './views/test/test.vue')
    }
  ]
});

router.beforeEach((to,from,next)=>{

  Store.commit('progressStart');

  if(to.meta.fullContent){
    if(!from.meta.fullContent){
      Store.commit('fullContent', true);
    }
  }

  next();

});

router.afterEach((to,from) => {

  Store.commit('progressDone');

  if(from.meta.fullContent && !to.meta.fullContent){
    Store.commit('fullContent',false);
  }

});

export default router;
