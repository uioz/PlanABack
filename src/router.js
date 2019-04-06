import Vue from 'vue'
import Router from 'vue-router'
import Index from "./views/index/index";

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path:'/error/:code',
      component: () => import(/* webpackChunkName: "error" */ './views/error/error.vue')
    },
    {
      path: '/test',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "test" */ './views/test/test.vue')
    }
  ]
})
