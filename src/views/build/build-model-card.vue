<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <div class="build-model-card">
    <build-model-card-head v-if="!lastCard" :label="label" @cancel="handleCancelAll"></build-model-card-head>
    <build-model-card-item class="build-item" v-for="item of transformedSource" :key="item" :label="item"></build-model-card-item>
  </div>
</template>
<script>
import buildModelCardHead from "./build-model-card-head";
import buildModelCardItem from './build-model-card-item';

export default {
  name: "build-model-card",
  components: {
    buildModelCardHead,
    buildModelCardItem
  },
  props: {
    label: {
      type: String,
      default: "所有专业"
    },
    index: {
      type: Number,
      required: true
    },
    source: {
      type: [Array, Object],
      required: true
    }
  },
  computed:{
    lastCard(){
      return Array.isArray(this.source);
    },
    transformedSource(){
      if(this.lastCard){
        return this.source;
      }else{
        return Object.keys(this.source);
      }
    }
  },
  methods:{
    handleCancelAll(){
      console.log('cancelAll')
    },
    handleItemEdit(){
      console.log('itemEdit')
    },
    handleItemRemove(){
      console.log('itemRemove')
    },
    handleAddItem(){
      console.log('addItem')
    }
  }
};
</script>
<style>
.build-model-card {
  width: 250px;
}

.build-model-card .build-item{
  margin-top: 10px;
}

</style>

