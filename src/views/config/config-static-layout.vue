<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-row class="config-static-layout" gutter>
    <mu-col :span="6">
      <slot name="left-area"></slot>
    </mu-col>
    <mu-col :span="6">
      <slot name="right-area"></slot>
    </mu-col>
  </mu-row>
</template>
<script>
export default {
  name:'config-static-layout'
}
</script>
<style>
.config-static-layout,
.config-static-layout > .col{
  height: 100%;
}

</style>

