<template>
  <mu-appbar class="i-navbar" style="width: 100%;" color="primary">
    <mu-button icon slot="left">
      <font-awesome-icon icon="bars"/>
    </mu-button>
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
  data() {
    return {
      items: [
        {
          text: "Dashboard",
          disabled: false
        },
        {
          text: "Link 1",
          disabled: false
        },
        {
          text: "Link 2",
          disabled: true
        }
      ]
    };
  }
};
</script>

