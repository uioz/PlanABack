<docs>

  intro:

  props:
  label:string='所有专业' // 标签名称也是对象的键名
  index:number // 当前卡片相对于全局卡片数组中的下标

  methods:
  pick(index:number,label:string):void // 当卡片内部的项目被点击的时候触发

  slots:

  process:

</docs>
<template>
  <div class="build-model-card">
    <build-model-card-head v-if="!lastCard" :label="label" @cancel="handleCancelAll"></build-model-card-head>
    <build-model-card-item
      v-for="item of transformedSource"
      :key="item"
      :label="item"
      @pick="handleItemPick"
      @change="handleItemChange"
      @remove="handleItemRemove"
    ></build-model-card-item>
    <build-model-card-plus
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
    lastCard() {
      return Array.isArray(this.source);
    },
    transformedSource() {
      if (this.lastCard) {
        return this.source;
      } else {
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
    handleCancelAll() {
      console.log("cancelAll");
    },
    handleItemRemove() {
      console.log("itemRemove");
    },
    handleItemChange() {
      console.log("itemChange");
    },
    handlePlusChange(){
      console.log('plusChange')
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

