<docs>

  intro:

  props:

  methods:
  update:drawerClick():void // 当导航栏左侧的按钮被点击后触发

  slots:

  process:

</docs>
<template>
  <mu-appbar class="i-navbar" style="width: 100%;" color="primary">
    <template #left>
      <mu-button icon @click="$emit('drawerClick')">
        <font-awesome-icon icon="bars"/>
      </mu-button>
    </template>
    <mu-tabs class="button-group" :value.sync="active">
      <mu-tab>模型构建</mu-tab>
      <mu-tab>数据处理</mu-tab>
      <mu-tab>全局处理</mu-tab>
      <mu-tab>权限管理</mu-tab>
    </mu-tabs>
    <template #right>
      <mu-button color="info">登录</mu-button>
      <font-awesome-icon style="margin:0 2px;" icon="slash" :transform="{ rotate: 53 }"/>
      <mu-button color="secondary">注销</mu-button>
    </template>
  </mu-appbar>
</template>
<script>

export default {
  name: "i-navbar",
  props: {
    drawerClick: Boolean
  },
  data() {
    return {
      active:0
    };
  }
};
</script>
<style>
.i-navbar .button-group{
  height: 64px;
}
</style>

