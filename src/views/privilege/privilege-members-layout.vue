<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-row class="privilege-members-layout" gutter>
    <mu-col :span="8">
      <slot name="left-area"></slot>
    </mu-col>
    <mu-col :span="4">
      <slot name="right-area"></slot>
    </mu-col>
  </mu-row>
</template>
<script>
export default {
  name:'privilege-members-layout'
}
</script>
<style>

</style>

