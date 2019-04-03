<template>
  <mu-drawer v-bind="$props" v-on="$listeners" :docked="false" >
    <mu-list>
      <mu-list-item button>
        <mu-list-item-title>Menu Item 1</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-title>Menu Item 2</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button>
        <mu-list-item-title>Close</mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </mu-drawer>
</template>
<script>
export default {
  name: "i-drawer",
  props:{
    open:Boolean
  }
};
</script>

