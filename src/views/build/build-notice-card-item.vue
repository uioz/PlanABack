<docs>

  intro:

  props:
  label:string // 本item名称

  methods:
  pick():void //当点击项目时候触发

  slots:

  process:

</docs>
<template>
  <mu-paper class="build-notice-card-item">
    <mu-tooltip :content="notice || '目前没有通知哦'">
      <mu-button class="button" flat @click="$emit('pick')">{{label}}</mu-button>
    </mu-tooltip>
  </mu-paper>
</template>
<script>
export default {
  name: "build-notice-card-item",
  props: ["label","notice"],
};
</script>
<style>
.build-notice-card-item {
  display: flex;
  justify-content: center;
  width: 100%;
  overflow-x: hidden;
}

.build-notice-card-item .button {
  width: 100%;
}
</style>

