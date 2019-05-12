<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-button class="i-upload-simple" v-bind="$attrs" v-on="$listeners" @click="handleButtonClick">
    <!-- pass down slot. see https://stackoverflow.com/questions/50891858/vue-how-to-pass-down-slots-inside-wrapper-component -->
    <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>
    <input ref="inputFile" @change="handleFilesChange" :multiple="multiple" :accept="accept" style="display:none" type="file">
  </mu-button>
</template>
<script>
export default {
  name:'i-upload-simple',
  props:{
    accept:String,
    multiple:{
      type:Boolean,
      default:false
    }
  },
  methods:{
    handleButtonClick(){
      return this.$refs.inputFile.click();
    },
    handleFilesChange(event){
      return this.$emit("change",event.target.files);
    }
  }
}
</script>
