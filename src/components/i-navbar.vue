<docs>

  intro:

  props:

  methods:
  update:drawerClick():void // 当导航栏左侧的按钮被点击后触发

  slots:

  process:
  1. 监听路由地址变化
    1.2 根据地址转换出对于的下标用于高亮tabs的下标
  2. 利用数据渲染tabs
    2.1 点击标签后跳转到对应路由

</docs>
<template>
  <mu-appbar class="i-navbar" style="width: 100%;" color="primary">
    <template #left>
      <mu-button icon @click="$emit('drawerClick')">
        <font-awesome-icon icon="bars"/>
      </mu-button>
    </template>
    <mu-tabs v-if="isLogin" class="button-group" :value="activeIndex">
      <mu-tab v-for="item of tabsList" :key="item.tabActiveIndex" :to="item.route">{{item.label}}</mu-tab>
    </mu-tabs>
    <template #right>
      <mu-button v-if="isLogin" color="secondary" @click="handleLogout">注销</mu-button>
      <font-awesome-icon
        v-show="isLogin"
        style="margin:0 2px;"
        icon="slash"
        :transform="{ rotate: 53 }"
      />
      <mu-paper v-if="isLogin" class="welcome" :z-depth="0">
        <font-awesome-icon
          style="margin-right:10px"
          class="mu-primary-text-color"
          size="lg"
          icon="user-circle"
        />
        <span>{{baseInfo.appname}}</span>
      </mu-paper>
      <mu-button v-if="!isLogin" :disabled="logoutLock" color="secondary" to="/login">登录</mu-button>
    </template>
  </mu-appbar>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "i-navbar",
  props: {
    drawerClick: Boolean
  },
  computed: {
    ...mapState(["baseInfo"]),
    ...mapGetters(['isLogin']),
    params() {
      return this.$route.path;
    }
  },
  created() {
    this.changeActiveTabName(this.$route.path);
  },
  watch: {
    params(path) {
      this.changeActiveTabName(this.$route.path);
    }
  },
  data() {
    return {
      activeIndex: 0,
      tabsList: [
        { label: "首页", route: "/", activeIndex: 0 },
        { label: "模型构建", route: "/build", activeIndex: 1 },
        { label: "数据处理", route: "/data", activeIndex: 2 },
        { label: "全局控制", route: "/config", activeIndex: 3 },
        { label: "权限控制", route: "/privilege", activeIndex: 4 }
      ],
      logoutLock: false
    };
  },
  methods: {
    ...mapActions(["requestLogout"]),
    async handleLogout() {
      this.logoutLock = true;
      if (await this.requestLogout()) {
        this.$router.replace("/login");
      }
      this.logoutLock = false;
    },
    changeActiveTabName(path) {
      const tabsMap = {
        "/": 0,
        "/build/": 1,
        "/data/": 2,
        "/config/": 3,
        "/privilege/": 4
      };

      // will return null when nothing to matched
      const topPath = path.match(/^.*\//);

      this.activeIndex = topPath ? tabsMap[topPath] : 0;
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

