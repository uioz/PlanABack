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
        <mu-list>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="inbox"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>应用名称</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="grade"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>客户端应用名称</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="send"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>后台系统首屏公告</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-action>
              <mu-icon value="drafts"></mu-icon>
            </mu-list-item-action>
            <mu-list-item-title>客户端首屏公告</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-paper>
    </template>
    <template #modify-area>
      <mu-paper :z-depth="2">
        hello world
      </mu-paper>
    </template>
  </config-message-layout>
</template>
<script>
import configMessageLayout from "./config-message-layout";

export default {
  name: "config-message",
  components: {
    configMessageLayout
  }
};
</script>
<style>
</style>

