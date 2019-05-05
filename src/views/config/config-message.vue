<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <config-message-layout class="config-message">
    <template #list-area>
      <mu-paper :z-depth="2">
        <i-list-simple :lists="listData" @change="handleListChange"></i-list-simple>
      </mu-paper>
    </template>
    <template #modify-area>
      <mu-paper :z-depth="2">hello world</mu-paper>
    </template>
  </config-message-layout>
</template>
<script>
import iListSimple from "@/components/i-list-simple";
import configMessageLayout from "./config-message-layout";

// TODO end提供一个批量更新这个四个属性的功能

export default {
  name: "config-message",
  components: {
    configMessageLayout,
    iListSimple
  },
  data() {
    return {
      listData: [
        {
          label: "系统应用名称",
          faIcon: "terminal",
          index: "system-name"
        },
        {
          label: "客户端应用名称",
          faIcon: "mobile",
          index: "client-name"
        },
        {
          label: "系统公告",
          faIcon: "broadcast-tower",
          index: "system-message"
        },
        {
          label: "客户端公告",
          faIcon: "bullhorn",
          index: "client-message"
        }
      ]
    };
  },
  methods: {
    handleListChange(index) {
      console.log(index);
    }
  }
};
</script>
<style>
</style>

