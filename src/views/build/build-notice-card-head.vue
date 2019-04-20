<docs>

  intro:
  用于通知消息的内容区域中的卡片项目中的表头.  
  这个组件主要负责事件的触发.

  props:

  methods:
  setting():void // 当点击统一设置的时候触发
  remove():void // 当点击全部删除的时候触发

  slots:

  process:

</docs>
<template>
  <mu-paper class="build-notice-card-head" >
    <mu-button small flat color="info" @click="$emit('setting')">统一设置</mu-button>
    <mu-button small flat color="error" @click="$emit('remove')">全部删除</mu-button>
  </mu-paper>
</template>
<script>
export default {
  name: "build-notice-card-head"
};
</script>
<style>
.build-notice-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}
</style>

