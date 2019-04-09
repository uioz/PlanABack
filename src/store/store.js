import Vue from 'vue'
import Vuex from 'vuex'
import requests from "../request/request.js";
import Storage from "./storage.js";
import Progress from "../plugin/museprogress.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // see https://vuex.vuejs.org/zh/guide/strict.html#%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E4%B8%8E%E5%8F%91%E5%B8%83%E7%8E%AF%E5%A2%83
  state: {
    info: {
      isLogin: true, // 是否登录
    },
    fullContent: false, // 屏蔽导航和侧边栏
    Progressing: false, // 是否在progress状态
    errorCode: 0,
  },
  mutations: {
    /**
     * 合并服务器公开信息到内部状态  
     * 并且写入缓存
     * **注意**:该方法有副作用
     * @param {Object} state 
     * @param {Object} initDataFromLocalStorage 需要被初始化的对象
     */
    initState(state, initDataFromLocalStorage) {
      state.info = Object.assign({}, state.info, initDataFromLocalStorage);
      Storage.set('localInfo', state.info);
    },
    /**
     * 清空保存的服务器公开信息  
     * 且清空本地缓存
     */
    clearInfo(state) {
      state.info = {};
      Storage.set('localInfo', state.info);
    },
    /**
     * 设置跳转码
     * @param {Object} state 
     * @param {Number} code 错误代码
     */
    setErrorCode(state, code) {
      state.errorCode = code;
    },
    /**
     * 清空内部的错误码
     */
    clearErrorCode(state) {
      state.errorCode = 0;
    },
    /**
     * 调用后触发全局的进度加载后修改内部的Progressing状态
     * **注意**:该方法有副作用-修改进度条
     * @param {Object} state 
     */
    progressStart(state) {
      if (!state.Progressing) {
        Progress.start();
        state.Progressing = true;
      }
    },
    /**
    * 调用后触发全局的进度加载后修改内部的Progressing状态
    * **注意**:该方法有副作用-修改进度条
    * @param {Object} state
    */
    progressDone(state) {
      if (state.Progressing) {
        Progress.done();
        state.Progressing = false;
      }
    },
    /**
     * 修改是否全面显示,当设置为true的时候则,导航栏和侧边栏消失
     * @param {Object} state 
     * @param {Boolean} full 全面显示的状态
     */
    fullContent(state,full){
      state.fullContent = !!full;
    }
  },
  actions: {
    ...requests
  }
});
