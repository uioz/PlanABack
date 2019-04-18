<docs>

  intro:

  props:

  methods:
  change(text:string):void // 当回车确认时候发送文本

  slots:

  process:

</docs>
<template>
  <mu-paper class="build-model-card-plus">
    <mu-text-field v-model="inputText" @keyup.enter="handleEnter" full-width label-float help-text="回车后添加新的字段">
      <font-awesome-icon icon="plus"></font-awesome-icon>
    </mu-text-field>
    <br>
  </mu-paper>
</template>
<script>
export default {
  name: "build-model-card-plus",
  data() {
    return {
      inputText: ""
    };
  },
  methods:{
    handleEnter(){
      if(this.inputText){
        return this.$emit('change',this.inputText);
      }
    }
  }
};
</script>
<style>
.build-model-card-plus {
  padding: 10px;
  border: 1px solid rgb(66, 66, 66);
}
</style>