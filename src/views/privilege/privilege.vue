<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <build-layout class="privilege">
    <template #sidebar-area>
      <!-- activeTab from minixs -->
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
  name: "privilege",
  mixins:[autoTabIndex],
  components: {
    buildSidebar,
    buildLayout
  },
  data() {
    return {
      sidebarData: [
        {
          label: "人员管理",
          icon: "id-card",
          activeName: "members",
          to: "/privilege/members"
        },
        {
          label: "权限管理",
          icon: "eye",
          activeName: "management",
          to: "/privilege/management"
        },
      ]
    };
  }
};
</script>
<style>
</style>

