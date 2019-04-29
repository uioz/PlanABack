<docs>

  intro:
  这个组件用于数据处理的主页面.  
  **注意**:这个组件是路由下的根组件.  

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <build-layout class="data">
    <template #sidebar-area>
      <build-sidebar :active="activeTab" :source="sidebarData"></build-sidebar>
    </template>
    <template #content-area>
      <router-view></router-view>
    </template>
  </build-layout>
</template>
<script>
import buildSidebar from "../build/build-sidebar";
import buildLayout from "../build/build-layout";
import { autoTabIndex } from "../../utils/interface.js";

// TODO 添加文件管理

export default {
  name:'dataset', // 不可以和内置名称重复这里起名为dataset
  mixins:[autoTabIndex],
  components:{
    buildSidebar,
    buildLayout
  },
  data(){
    return{
      sidebarData:[
        {
          label: "数据上传",
          icon: "upload",
          activeName: "upload",
          to: "/data/upload"
        },
        {
          label: "数据下载",
          icon: "download",
          activeName: "download",
          to: "/data/download"
        },
        {
          label: "预览",
          icon: "glasses",
          activeName: "preview",
          to: "/data/preview"
        }
      ]
    }
  }
}
</script>
<style>

</style>

