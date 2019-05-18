import Vue from 'vue'
import Vuex from 'vuex'
import requests from "../request/request.js";
import {clearUserData,getUserData,updateUserData} from "./storage.js";
import Progress from "../plugin/museprogress.js";
import { easyAssign } from "../utils/public";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // see https://vuex.vuejs.org/zh/guide/strict.html#%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E4%B8%8E%E5%8F%91%E5%B8%83%E7%8E%AF%E5%A2%83
  state: {
    info:undefined,
    userData: getUserData(), 
    fullContent: false, // 屏蔽导航和侧边栏
    Progressing: false, // 是否在progress状态
    errorCode: 0,
  },
  getters:{
    isLogin(state){
      return !!state.userData
    },
    serverInfo(state){
      return state.info || {};
    }
  },
  mutations: {
    compareData(state,{target,data}){
      state[target] = Object.assign({},state[target],data);
    },
    clearUserData(state){
      state.userData = undefined;
      clearUserData();
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
    ...requests,
    // TODO initState 改为commit initInfo
    /**
     * 发送一个登录请求到服务器,如果登录成功这个actions会自动合并状态  
     * 如果失败则自动拦截错误  
     * 返回一个布尔值,表示登录是否成功
     * @param {*} param0 
     * @param {Object} data 登录需要数据
     * @returns {Boolean} 是否登录成功
     */
    async requestLogin({dispatch,commit},data){

      const response = await dispatch('post', {
        target: 'login',
        data,
      });

      if(response){
        commit('compareData',{
          target:'userData',
          data:response.data.data
        });
        updateUserData(response.data.data);
        return true;
      }

      return false;

    },
    /**
     * 发送登出请求,  
     * 登出成功返回true,  
     * 反之返回false.  
     * 如果有其他呢绒出现
     */
    async requestLogout({dispatch,commit}){
      
      const result = await dispatch('get',{
        target:'logout'
      });

      if(result){
        
        return true;
      }else{
        return false;
      }

    }
  }
});
