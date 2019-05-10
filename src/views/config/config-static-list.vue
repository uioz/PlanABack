<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="config-static-list" :z-depth="2">
    <config-static-list-item v-for="(value,key) in source" :key="key" :label="value" :value="key" @change="handleItemChange"></config-static-list-item>
  </mu-paper>
</template>
<script>
import configStaticListItem from './config-static-list-item';

export default {
  name:'config-static-list',
  components:{
    configStaticListItem
  },
  data(){
    return {
      source:{
        'logo':'logo',
        'serverbackground':'客户端背景图',
        'clientbackground':'服务端背景图'
      }
    }
  },
  methods:{
    handleItemChange(){

    }
  }
}
</script>
<style>
.config-static-list{
  padding: 20px;
}

.config-static-list > .config-static-list-item+.config-static-list-item{
  margin-top: 10px;
}

</style>

