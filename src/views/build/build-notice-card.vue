<docs>

  intro:

  props:

  methods:
  set-all(index:number,label:string):void // 点击设置全部后触发
  remove-all(index:number,label:string):void // 点击全部删除后触发
  pick-item(index:number,label:string,name:string):void // 当选中有字节点的项目时触发
  edit-item(index:number,label:string,name:string):void// 当选中可以编辑节点的时候触发

  slots:

  process:

</docs>
<template>
  <mu-paper class="build-notice-card" :z-depth="5">
    <build-notice-card-head @setting="handleSetAll" @remove="handleRemoveAll" ></build-notice-card-head>
    <build-notice-card-item v-for="item in source" :key="item.name" :label="item.name" @pick="handleItemPick(item.name)" ></build-notice-card-item>
  </mu-paper>
</template>
<script>
import buildNoticeCardHead from './build-notice-card-head';
import buildNoticeCardItem from './build-notice-card-item';

export default {
  name: "build-notice-card",
  components:{
    buildNoticeCardHead,
    buildNoticeCardItem
  },
  props: {
    label: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    source: {
      type: Array,
      required: true
    }
  },
  methods:{
    handleItemPick(name){

      const [target] = this.source.filter(value=>value.name===name);

      if(target.lists.length){
        return this.$emit('pick-item',this.index,this.label,name);
      }else{
        return this.$emit('edit-item',this.index,this.label,name);
      }

    },
    handleSetAll(){
      return this.$emit("set-all",this.index,this.label);
    },
    handleRemoveAll(){
      return this.$emit("remove-all",this.index,this.label);
    }
  }
};
</script>
<style>
.build-notice-card{
  height: 100%;
  width: 200px;
  overflow-y: auto;
}
</style>

