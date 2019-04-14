<template>
  <mu-paper class="build-sidebar" :z-depth="2" >
    <mu-list :value="activeName">
      <mu-list-item button v-for="item of soruce" :key="item.label" :to="item.to" :value="item.activeName">
        <mu-list-item-action>
          <font-awesome-icon :icon="item.icon"></font-awesome-icon>
        </mu-list-item-action>
        <mu-list-item-title>{{item.label}}</mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </mu-paper>
</template>
<script>
export default {
  name: "build-sidebar",
  props:{
    active:{
      type:String,
    },
    soruce:{
      type:Array,
      default(){
        return [
          {
            label:'专业模型构建',
            icon:'cubes',
            activeName:'model',
            to:'/build/model'
          },
          {
            label:'通知消息',
            icon:'comment',
            activeName:'notice',
            to:'/build/notice'
          },
          {
            label:'结果预览',
            icon:'rocket',
            activeName:'preview',
            to:'/build/preview'
          },
        ]
      }
    }
  },
  computed:{
    activeName(){
      return this.active ? this.active : this.soruce[0] ? this.soruce[0].activeName : '';
    }
  },
};
</script>
<style>
.build-sidebar{
  height: inherit;
}
</style>


