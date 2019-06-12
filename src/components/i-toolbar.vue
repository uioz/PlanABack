<docs>

  intro:
  该组件用于内容区域的工具栏,在这个组件中依赖状态,来更新内部组件的状态.  
  且会触发多种事件.  

  props:
  edited:boolean=false // 内容是否被编辑(被编辑则保存激活)

  methods:
  save():void // 当点击保存的时候触发

  slots:
  default // 用于放置插槽右侧的内容
  left // 用于放置插槽左侧的内容

  process:

</docs>
<template>
  <mu-appbar class="i-boolbar" :color="color">
    <template #left>
      <slot name="left"></slot>
    </template>
    <template #right>
      <mu-container class="buttons">
        <slot></slot>
        <mu-button @click="$emit('save')" :disabled="!edited" color="cyan500">保存</mu-button>
      </mu-container>
    </template>
  </mu-appbar>
</template>
<script>
export default {
  name: "i-toolbar",
  props: {
    color:{
      type:String,
      default:'grey800'
    },
    edited: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style>
/* hack mu-button */
.i-boolbar .buttons > .mu-button + .mu-button {
  margin-left: 10px;
}
</style>

