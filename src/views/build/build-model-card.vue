<docs>

  intro:

  props:
  label:string='所有专业' // 标签名称也是对象的键名
  index:number // 当前卡片相对于全局卡片数组中的下标

  methods:
  pick(index:number,label:string):void // 当卡片内部的项目被点击的时候触发
  remove-all(index:number,label:string):void // 当移出所有的项目的时候触发,注意这里的label是card的label
  remove(index:number,parentLabel:string,childLabel:string):void // 当移除某一项的时候触发,注意这里的label是被移除项目(item)的label
  change(index:number,parentLabel:string,childLabel:string,inputText:string):void // 当修改原有的内容的时候触发
  plus-item(index:number,label:string,inputText:string,isResultSet:boolean):void // 当触发添加新的的项目的时候触发

  slots:

  process:

</docs>
<template>
  <div class="build-model-card">
    <build-model-card-head v-if="index !== 0" :label="label" @remove="handleRemoveAll"></build-model-card-head>
    <build-model-card-item
      v-for="item of transformedSource"
      :key="item"
      :label="item"
      @pick="handleItemPick"
      @change="handleItemChange"
      @remove="handleItemRemove"
    ></build-model-card-item>
    <build-model-card-plus
      :hide-switch="isLastOneCard"
      @change="handlePlusChange"
    ></build-model-card-plus>
  </div>
</template>
<script>
import buildModelCardHead from "./build-model-card-head";
import buildModelCardItem from "./build-model-card-item";
import buildModelCardPlus from './build-model-card-plus';


export default {
  name: "build-model-card",
  components: {
    buildModelCardHead,
    buildModelCardItem,
    buildModelCardPlus
  },
  props: {
    label: {
      type: String,
      required:true
    },
    index:{
      type:Number,
      required:true
    },
    source: {
      type: [Array, Object],
      required: true
    }
  },
  computed: {
    isLastOneCard(){
      return Array.isArray(this.source);
    },
    transformedSource() {

      if(Array.isArray(this.source)){
        return this.source
      }else{
        return Object.keys(this.source);
      }
    }
  },
  methods: {
    handleItemPick(label) {
      // 如果是数组,则已经没有类似于对象的嵌套的结构了
      // 所以不会触发点击事件
      if(!Array.isArray(this.source)){
        this.$emit('pick',this.index,label);
      }
    },
    handleRemoveAll() {
      this.$emit('remove-all',this.index,this.label);
    },
    handleItemRemove(label) {
      this.$emit('remove',this.index,this.label,label);
    },
    handleItemChange(label,inputText) {
      this.$emit('change',this.index,this.label,label,inputText);
    },
    handlePlusChange(inputText,isResultSet){
      this.$emit('plus-item',this.index,this.label,inputText,isResultSet);
    }
  }
};
</script>
<style>
.build-model-card {
  height: 100%;
  width: 250px;
  overflow-y: auto;
}

.build-model-card .build-model-card-item,
.build-model-card .build-model-card-plus {
  margin-top: 10px;
}
</style>

