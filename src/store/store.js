import Vue from 'vue'
import Vuex from 'vuex'
import requests from "../request/request.js";
import Storage from "./storage.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // see https://vuex.vuejs.org/zh/guide/strict.html#%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E4%B8%8E%E5%8F%91%E5%B8%83%E7%8E%AF%E5%A2%83
  state: {
    isLogin:false, // 是否登录
    info:{}
  },
  mutations: {
    initState(state,initDataFromLocalStorage){
      Object.assign(state.info,initDataFromLocalStorage);
      Storage.set('localInfo',state.info);
    },
    clearInfo(state){
      state.info = {};
      Storage.set('localInfo',state.info);
    }
  },
  actions: {
    ...requests
  }
});
