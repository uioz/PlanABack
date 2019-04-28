<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <data-upload-layout class="data-download">
    <template #intro-area>
      <div>intro</div>
    </template>
    <template #operation-area>
      <div>operation</div>
    </template>
  </data-upload-layout>
</template>
<script>
import dataUploadLayout from "./data-upload-layout";

export default {
  name:'data-download',
  components:{
    dataUploadLayout
  }
}
</script>
<style>

</style>

