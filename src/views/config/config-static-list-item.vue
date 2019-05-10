<docs>

  intro:

  props:

  methods:

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
      this.$emit('change',this.value,event.dataTransfer.getData('text/plain'));
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

