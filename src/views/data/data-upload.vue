<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <data-upload-layout class="data-upload">
    <template #intro-area>
      <data-upload-intro></data-upload-intro>
    </template>
    <template #upload-area>
      <data-upload-upload></data-upload-upload>
    </template>
  </data-upload-layout>
</template>
<script>
import dataUploadLayout from './data-upload-layout';
import dataUploadIntro from './data-upload-intro';
import dataUploadUpload from './data-upload-upload';


export default {
  name:'data-upload',
  components:{
    dataUploadLayout,
    dataUploadIntro,
    dataUploadUpload
  }
}
</script>
<style>

</style>

