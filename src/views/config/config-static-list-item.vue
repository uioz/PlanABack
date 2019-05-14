<docs>

  intro:

  props:
  label:string // 展示项目的名称
  value:string // 对应名称的id

  methods:
  change(value:string,data:object) 
  // 当静态图片资源数据关联的时候触发

  slots:

  process:

</docs>
<template>
  <mu-button class="config-static-list-item" round color="red500" @dragover="handleOver" @drop="handleDrop">{{label}}&nbsp;&nbsp;<font-awesome-icon icon="link"/></mu-button>
</template>
<script>
export default {
  name:'config-static-list-item',
  props:['label','value'],
  methods:{
    handleOver(event){
      event.preventDefault();
    },
    handleDrop(event){
      this.$emit('change',this.value,JSON.parse(event.dataTransfer.getData('text/plain')));
    }
  }
}
</script>
<style>
.config-static-list-item{
  display: block;
  width: 100%;
}
</style>

