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

  process:

</docs>
<template>
  <mu-appbar color="grey800">
    <template #right>
      <mu-container>
        <template></template>
        <mu-button @click="$emit('onSave')" :disabled="!edited" color="cyan500">保存</mu-button>
      </mu-container>
    </template>
  </mu-appbar>
</template>
<script>
export default {
  name: "i-toolbar",
  props: {
    edited: {
      type: Boolean,
      default: false
    }
  },
};
</script>
<style>

</style>

