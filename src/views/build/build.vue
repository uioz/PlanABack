<template>
  <build-layout class="build">
    <template #sidebar-area>
      <build-sidebar></build-sidebar>
      <mu-button @click="handleClick">test</mu-button>
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
  mixins:[autoTabIndex],
  components: {
    buildSidebar,
    buildLayout
  },
};
</script>



