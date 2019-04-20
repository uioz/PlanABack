<docs>

  intro:

  props:
  hideSwitch:boolean // 用于隐藏switch

  methods:
  change(text:string,isResultSet:boolean):void // 当回车确认时候发送文本

  slots:

  process:

</docs>
<template>
  <mu-paper class="build-model-card-plus">
    <mu-text-field v-model="inputText" :max-length="10" @keyup.enter="handleEnter" full-width label-float help-text="回车后添加新的字段">
      <font-awesome-icon icon="plus"></font-awesome-icon>
    </mu-text-field>
    <br>
    <mu-switch v-if="!hideSwitch" v-model="isResultSet" label="结果集"></mu-switch>
  </mu-paper>
</template>
<script>
export default {
  name: "build-model-card-plus",
  props:{
    hideSwitch:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      inputText: "",
      isResultSet:false
    };
  },
  methods:{
    handleEnter(){
      if(this.inputText){
        this.$emit('change',this.inputText,this.isResultSet);
        this.inputText = '';
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