<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <build-layout class="config">
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

export default {
  name:'config',
  mixins:[autoTabIndex],
  components:{
    buildSidebar,
    buildLayout
  },
  data(){
    return{
      sidebarData:[
        {
          label: "服务器开放",
          icon: "torii-gate",
          activeName: "switch",
          to: "/config/switch"
        },
        {
          label: "全局消息",
          icon: "bell",
          activeName: "message",
          to: "/config/message"
        },
        {
          label: "静态资源配置",
          icon: "cogs",
          activeName: "static",
          to: "/config/static"
        }
      ]
    }
  }
}
</script>
<style>

</style>

