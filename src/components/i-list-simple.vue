<docs>

  intro:

  props:
  lists:Array<object> // 用于驱动组件渲染的数据
  // 格式如下
  [
    {
      label:string, // 标签的名称
      index:string,// 触发change事件且提供的类称
      to:string|object, // 将提供给mu-list-item用于导航跳转
      faIcon:string // fontawesome图标的名称
    }
  ]
  activeIndex:string // 激活的index默认lists中的第一个元素的index


  methods:

  slots:

  process:

</docs>
<template>
  <mu-list class="i-list-simple" :value="realActiveIndex" @change="$emit('change',$event)">
    <mu-list-item button v-for="item in lists" :key="item.label" :value="item.index" :to="item.to">
      <mu-list-item-action>
        <font-awesome-icon :icon="item.faIcon"/>
      </mu-list-item-action>
      <mu-list-item-title>{{item.label}}</mu-list-item-title>
    </mu-list-item>
  </mu-list>
</template>
<script>
export default {
  name: "i-tabs",
  props: {
    lists:{
      type:Array,
      default(){
        return [];
      }
    },
    activeIndex:String
  },
  computed: {
    realActiveIndex(){
      return this.activeIndex || this.lists.length ? this.lists[0].index : undefined;
    }
  }
};
</script>
<style>
</style>

