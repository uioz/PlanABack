<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="build-notice-edit-card" :z-depth="5">
    <h4>预览&编辑</h4>
    <mu-text-field v-bind="$attrs" v-on="$listeners" placeholder="还没有通知哦" multi-line :rows="3" :rows-max="6"></mu-text-field>
    <br>
    <mu-button style="margin-bottom:10px;" color="primary" @click="$emit('confirm',label)">确认修改</mu-button>
  </mu-paper>
</template>
<script>
export default {
  name:'build-notice-edit-card',
  props:{
    label:String
  },
}
</script>
<style>
.build-notice-edit-card{
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  padding: 0 20px;
}
</style>

