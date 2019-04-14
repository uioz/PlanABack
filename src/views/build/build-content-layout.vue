<docs>

  intro:
  该组件负责构建页面的内容区域的布局.  
  本组件只提供slots.

  props:

  methods:

  slots:
  toolbar-arae // 放置工具栏
  content-area // 放置内容区域

  process:

</docs>
<template>
  <div class="build-content-layout">
    <div class="toolbar">
      <slot name="toolbar-area"></slot>
    </div>
    <div class="content">
      <slot name="content-area"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name:'build-content-layout'
}
</script>
<style>
.build-content-layout{
  height: inherit;
}

.build-content-layout > .toolbar{
  min-height: 64px;
}

.build-content-layout > .content{
  margin-top: 20px;
}

</style>

