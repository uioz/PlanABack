<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-grid-list class="config-static-assets-photo">
    <mu-sub-header>图片资源</mu-sub-header>
    <mu-grid-tile v-for="imageData in value" :key="imageData.id">
      <img :src="imageData.src" :alt="imageData.fileName">
      <template #title>
        <span draggable="true" @dragstart="handleDragStart($event,imageData)">
          <font-awesome-icon icon="external-link-alt"/>
        </span>
      </template>
      <template #action>
        <mu-button fab small color="secondary" @click="handleDelete(imageData)">
          <font-awesome-icon icon="trash-alt"/>
        </mu-button>
      </template>
    </mu-grid-tile>
  </mu-grid-list>
</template>
<script>
export default {
  name: "config-static-assets-photo",
  props:{
    value:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  methods:{
    handleDelete(imageData){
      // TOOD 
      // TODO 触发删除事件
    },
    handleDragStart(event,imageData){
      event.dataTransfer.effectAllowed = 'link';
      event.dataTransfer.setData('text/plain',JSON.stringify(imageData));
    }
  }
};
</script>
<style>
</style>

