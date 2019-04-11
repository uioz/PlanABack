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
    <mu-tabs v-show="info.isLogin" class="button-group" :value.sync="active">
      <mu-tab>模型构建</mu-tab>
      <mu-tab>数据处理</mu-tab>
      <mu-tab>全局处理</mu-tab>
      <mu-tab>权限管理</mu-tab>
    </mu-tabs>
    <template #right>
        <mu-button v-if="info.isLogin" color="secondary" @click="handleLogout">注销</mu-button>
        <font-awesome-icon v-show="info.isLogin" style="margin:0 2px;" icon="slash" :transform="{ rotate: 53 }"/>
        <mu-paper v-if="info.isLogin" class="welcome" :z-depth="0">
          <font-awesome-icon
            style="margin-right:10px"
            class="mu-primary-text-color"
            size="lg"
            icon="user-circle"
          />
          <span>{{info.appname}}</span>
        </mu-paper>
        <mu-button v-if="!info.isLogin" :disabled="logoutLock" color="info" to="/login">登录</mu-button>
    </template>
  </mu-appbar>
</template>
<script>
import { mapState,mapActions } from "vuex";

export default {
  name: "i-navbar",
  props: {
    drawerClick: Boolean
  },
  computed: {
    ...mapState(["info"])
  },
  data() {
    return {
      active: 0,
      logoutLock:false,
    };
  },
  methods:{
    ...mapActions(['requestLogout']),
    async handleLogout(){
      this.logoutLock = true;
      if(await this.requestLogout()){
        this.$router.replace('/login');
      }
      this.logoutLock = false;
    }
  }
};
</script>
<style>
.i-navbar .button-group {
  height: 64px;
}

.i-navbar .welcome {
  display: flex;
  margin-right: -4px;
  padding: 0 10px;
  width: 12em;
  height: 50%;
  align-items: center;
  user-select: none;
}

.i-navbar .welcome > span {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

