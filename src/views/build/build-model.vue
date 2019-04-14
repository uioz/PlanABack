<template>
  <build-content-layout>
    <template #toolbar-area>
      <i-toolbar></i-toolbar>
    </template>
    <template #content-area>
      <div>content-area</div>
    </template>
  </build-content-layout>
</template>
<script>
import buildContentLayout from './build-content-layout';
import iToolbar from "../../components/i-toolbar";

export default {
  name:'build-model',
  components:{
    buildContentLayout,
    iToolbar
  },
  created(){
    console.log('build-model')
  }
}
</script>

