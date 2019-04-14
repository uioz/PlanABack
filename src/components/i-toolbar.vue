<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-appbar color="grey800">
    <template #right>
      <mu-button color="cyan500">保存</mu-button>
    </template>
  </mu-appbar>
</template>
<script>
export default {
  name: "i-toolbar",
  props: {
    edited: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
};
</script>
<style>
.i-toolbar {
}
</style>

