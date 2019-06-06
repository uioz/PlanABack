<docs>

  intro:
  本组件负责首页的内容区域.

  **注意**:进入本组件需要保证当前已经登录,该状态已经在路由中做了处理确保载入本组件后处于登陆状态.


  props:

  methods:

  slots:

  process:
  1. 加载服务器基本数据
    1.1 合并数据到内部状态中

  为了满足页面的渲染需要,该组件获取的数据格式如下:
  {
    nickNamek:string, //用户名称
    lastLoginTime:string, // ISO时间字符串
    startTime:string, // ISO时间字符串
    endTime:string, // ISO时间字符串
    runingTime:number, // 服务器运行时间
  }

  // TODO 等待添加统计信息

</docs>
<template>
  <index-layout>
    <template #left-area>
      <index-info :source="fetchData"></index-info>
    </template>
    <template #right-area>
      <index-total></index-total>
    </template>
  </index-layout>
</template>
<script>
import indexLayout from "./index-layout";
import indexInfo from "./index-info";
import indexTotal from "./index-total";
import { mapActions } from "vuex";

export default {
  name: "index",
  components: {
    indexLayout,
    indexInfo,
    indexTotal
  },
  data(){
    return {
      fetchData:undefined
    }
  },
  methods: {
    ...mapActions(["get"])
  },
  created() {
    this.get({
      target:'state'
    })
    .then(response=>{

      if(response){
        this.fetchData = response.data.data;
      }

    });
  }
};
</script>
<style>
</style>


