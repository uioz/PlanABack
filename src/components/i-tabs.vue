<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-tabs :value.sync="active1" inverse color="secondary" text-color="rgba(0, 0, 0, .54)" center>
    <mu-tab>TAB ITEM 1</mu-tab>
    <mu-tab>TAB ITEM 2</mu-tab>
    <mu-tab>TAB ITEM 3</mu-tab>
  </mu-tabs>
</template>
<script>
export default {
  name: "i-tabs",
  props: {
    source: Array,
    activeIndex: String
  },
  computed:{
    realActiveIndex
  }
};
</script>
<style>
</style>

