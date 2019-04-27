<template>
  <build-layout class="build">
    <template #sidebar-area>
      <build-sidebar :active="activeTab" :source="sidebarData"></build-sidebar>
    </template>
    <template #content-area>
      <router-view></router-view>
    </template>
  </build-layout>
</template>
<script>
import buildSidebar from "./build-sidebar";
import buildLayout from "./build-layout";
import { autoTabIndex } from "../../utils/interface.js";

export default {
  name: "build",
  mixins: [autoTabIndex],
  components: {
    buildSidebar,
    buildLayout
  },
  data() {
    return {
      sidebarData: [
        {
          label: "专业模型构建",
          icon: "cubes",
          activeName: "model",
          to: "/build/model"
        },
        {
          label: "通知消息",
          icon: "comment",
          activeName: "notice",
          to: "/build/notice"
        },
        {
          label: "结果预览",
          icon: "rocket",
          activeName: "preview",
          to: "/build/preview"
        }
      ]
    };
  }
};
</script>



