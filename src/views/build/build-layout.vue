<docs>

  intro:
  该组件用于构建页面的布局.  
  这个组件只提供布局.

  props:

  methods:

  slots:
  sidebar-area // 放置侧边栏
  content-area // 放置内容区域

  process:

</docs>
<template>
  <mu-container class="build-layout" fluid>
    <mu-row gutter>
      <mu-col span="12" sm="12" md="2" lg="2" xl="2">
        <slot name="sidebar-area"></slot>
      </mu-col>
      <mu-col span="12" sm="12" md="10" lg="10" xl="10">
        <slot name="content-area"></slot>
      </mu-col>
    </mu-row>
  </mu-container>
</template>
<script>
export default {
  name: "build-layout"
};
</script>
<style>
.build-layout{
  /* minus navbar height */
  height: calc(100vh - 64px);
  padding-top: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
}

.build-layout > .row,
.build-layout > .row > .col{
  height: 100%;
}

</style>


