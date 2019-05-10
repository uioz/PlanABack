<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <config-static-layout class="config-static">
    <template #left-area>
      <config-static-list></config-static-list>
    </template>
    <template #right-area>
      <config-static-assets></config-static-assets>
    </template>
  </config-static-layout>
</template>
<script>
import configStaticLayout from './config-static-layout';
import configStaticList from './config-static-list';
import configStaticAssets from './config-static-assets';

export default {
  name:'config-static',
  components:{
    configStaticLayout,
    configStaticList,
    configStaticAssets
  }
}
</script>
<style>

</style>

