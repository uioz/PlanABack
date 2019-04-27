<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-row class="data-upload-layout" gutter>
    <mu-col span="12" sm="5" md="5" lg="5" xl="5">
      <slot name="intro-area"></slot>
    </mu-col>
    <mu-col span="12" sm="7" md="7" lg="7" xl="7">
      <slot name="upload-area"></slot>
    </mu-col>
  </mu-row>
</template>
<script>
export default {
  name: "data-upload-layout"
};
</script>
<style>
.data-upload-layout {
}
</style>

