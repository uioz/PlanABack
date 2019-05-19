import Vue from 'vue'
import Vuex from 'vuex'
import requests from "../request/request.js";
import { baseInfo,userData } from "./storage.js";
import Progress from "../plugin/museprogress.js";
import { easyAssign } from "../utils/public";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // see https://vuex.vuejs.org/zh/guide/strict.html#%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E4%B8%8E%E5%8F%91%E5%B8%83%E7%8E%AF%E5%A2%83
  state: {
    baseInfo:baseInfo.get(),
    userData: userData.get(),
    fullContent: false, // 屏蔽导航和侧边栏
    Progressing: false, // 是否在progress状态
    errorCode: 0,
  },
  getters:{
    isLogin(state){
      return !!state.userData;
    },
    hasGotInfo(state){
      return !!state.baseInfo;
    }
  },
  mutations: {
    compareData(state,{target,data}){
      state[target] = easyAssign({},data,true);
    },
    clearUserData(state){
      state.userData = undefined;
      userData.clear();
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
    /**
     * 发送一个登录请求到服务器,如果登录成功这个actions会自动合并状态  
     * 如果失败则自动拦截错误  
     * 返回一个布尔值,表示登录是否成功
     * @param {*} param0 
     * @param {Object} data 登录需要数据
     * @returns {Boolean} 是否登录成功
     */
    async requestLogin({dispatch,commit},data){

      // TODO response 进行拦截
      // 当响应过期的时候
      // 清空本地的数据,跳转到登录页面
      const response = await dispatch('post', {
        target: 'login',
        data,
      });

      if(response){
        const data = response.data.data;
        commit('compareData',{
          target:'userData',
          data
        });
        userData.update(data);
        return true;
      }

      return false;

    },
    /**
     * 拉取服务器基本公开信息
     */
    async requestBaseInfo({dispatch,commit}){

      const response = await dispatch('get',{
        target:'base'
      });

      if(response){
        const data = response.data.data;
        commit('compareData',{
          target:'baseInfo',
          data
        });
        baseInfo.update(data);
      }

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
