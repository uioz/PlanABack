<docs>

  intro:

  props:
  enabled:boolean=false // 是否启用

  methods:

  slots:

  process:

</docs>
<template>
  <i-toolbar v-bind="$attrs" v-on="$listeners">
    <mu-button color="error" :disabled="!enabled" @click="$emit('reset')">重置</mu-button>
  </i-toolbar>
</template>
<script>
import iToolbar from "../../components/i-toolbar";

export default {
  name:'build-toolbar',
  components:{
    iToolbar
  },
  props:{
    enabled:{
      type:Boolean,
      default:false,
    }
  }
}
</script>
