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
        fullContent: true,
      },
      component: () => import(/* webpackChunkName: "login" */ './views/login/login.vue')
    },
    {
      path: '/build',
      component: () => import(/* webpackChunkName: "build" */ './views/build/build.vue'),
      redirect: '/build/model',
      children: [
        {
          path: 'model',
          meta: {
            activeTabName: 'model'
          },
          component: () => import(/* webpackChunkName: "build-model" */ './views/build/build-model.vue')
        },
        {
          path: 'notice',
          meta: {
            activeTabName: 'notice'
          },
          component: () => import(/* webpackChunkName: "build-notice" */ './views/build/build-notice.vue')
        },
        {
          path: 'preview',
          meta: {
            activeTabName: 'preview'
          },
          component: () => import(/* webpackChunkName: "build-preview" */ './views/build/build-preview.vue')
        },
      ]
    },
    {
      path: '/data',
      component: () => import(/* webpackChunkName: "data" */ './views/data/data.vue'),
      redirect: '/data/upload',
      children: [
        {
          path: 'upload',
          meta: {
            activeTabName: 'upload'
          },
          component: () => import(/* webpackChunkName: "data-upload" */ './views/data/data-upload.vue')
        },
        {
          path: 'download',
          meta: {
            activeTabName: 'download'
          },
          component: () => import(/* webpackChunkName: "data-download" */ './views/data/data-download.vue')
        },
        {
          path: 'preview',
          meta: {
            activeTabName: 'preview'
          },
          component: () => import(/* webpackChunkName: "data-preview" */ './views/data/data-preview.vue')
        },
      ]
    },
    {
      path: '/config',
      component: () => import(/* webpackChunkName: "config" */ './views/config/config.vue'),
      redirect: '/config/switch',
      children: [
        {
          path: 'switch',
          meta: {
            activeTabName: 'switch'
          },
          component: () => import(/* webpackChunkName: "config-switch" */ './views/config/config-switch.vue')
        },
        {
          path: 'static',
          meta: {
            activeTabName: 'static'
          },
          component: () => import(/* webpackChunkName: "config-static" */ './views/config/config-static.vue')
        },
        {
          path: 'message',
          meta: {
            activeTabName: 'message'
          },
          component: () => import(/* webpackChunkName: "config-message" */ './views/config/config-message.vue')
        },
      ]
    },
    {
      path: '/privilege',
      component: () => import(/* webpackChunkName: "privilege" */ './views/privilege/privilege.vue'),
      redirect: '/privilege/members',
      children: [
        {
          path: '/privilege/members',
          meta: {
            activeTabName: 'members'
          },
          component: () => import(/* webpackChunkName: "privilege-members" */ './views/privilege/privilege-members.vue')
        },
        {
          path: '/privilege/management',
          meta: {
            activeTabName: 'management'
          },
          component: () => import(/* webpackChunkName: "privilege-management" */ './views/privilege/privilege-management.vue')
        },
      ]
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



router.beforeEach((to, from, next) => {

  const meta = to.meta;

  if (meta.fullContent) {
    if (!from.meta.fullContent) {
      Store.commit('fullContent', true);
    }
  }

  Store.commit('progressStart');

  // 未登录的跳转到登录页面
  if (!Store.getters.isLogin) {

    // 忽略登陆页面的跳转
    if (to.path === '/login') {
      return next();
    }

    return next('/login');
  } else {
    return next();
  }


});

router.afterEach((to, from) => {

  Store.commit('progressDone');

  if (from.meta.fullContent && !to.meta.fullContent) {
    Store.commit('fullContent', false);
  }

});

export default router;
