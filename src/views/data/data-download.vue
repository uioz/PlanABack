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
      <data-download-intro></data-download-intro>
    </template>
    <template #operation-area>
      <data-download-download></data-download-download>
    </template>
  </data-upload-layout>
</template>
<script>
import dataUploadLayout from "./data-upload-layout";
import dataDownloadIntro from './data-download-intro';
import dataDownloadDownload from './data-download-download';

export default {
  name:'data-download',
  components:{
    dataUploadLayout,
    dataDownloadIntro,
    dataDownloadDownload
  }
}
</script>
<style>

</style>

