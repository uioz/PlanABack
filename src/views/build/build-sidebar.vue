<template>
  <mu-paper class="build-sidebar" :z-depth="2" >
    <mu-list :value="activeName">
      <mu-list-item button v-for="item of source" :key="item.label" :to="item.to" :value="item.activeName">
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
    source:{
      type:Array,
      default(){
        return [];
      }
    }
  },
  computed:{
    activeName(){
      return this.active ? this.active : this.source[0] ? this.source[0].activeName : '';
    }
  },
};
</script>
<style>
.build-sidebar{
  height: inherit;
}
</style>


