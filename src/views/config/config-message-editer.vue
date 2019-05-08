<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="config-message-editer" >
    <h4>编辑</h4>
    <mu-form ref="form" class="editer" :model="FormData">
      <mu-form-item prop="editedData" :rules="FormRules.editedData" >
        <mu-text-field v-model="FormData.editedData" multi-line :rows="6" full-width placeholder="空空如也" :max-length="233"></mu-text-field>
      </mu-form-item>
    </mu-form>
    <mu-button color="success" :disabled="!edited" @click="handleConfirmClick" >确认修改</mu-button>
  </mu-paper>
</template>
<script>
import * as validate from "../../utils/validates.js";

export default {
  name:'config-message-editer',
  props:['source'],
  data(){
    return {
      edited:false,
      FormRules:{
        editedData:[
          {validate:validate.mulitRowText,message:'只可以输入中英文以及常见的标点符号!'},
          {validate:validate.range(0,233),message:'最多只能输入233个字符!'}
        ]
      },
      FormData:{
        editedData:''
      }
    }
  },
  methods:{
    async handleConfirmClick(){
      if(await this.$refs.form.validate()){
        this.$emit('change',this.FormData.editedData);
        this.edited = false;
      }
    }
  },
  watch:{
    source(newValue){
      this.FormData.editedData = newValue;
    },
    'FormData.editedData'(){
      this.edited = true;
    }
  }
}
</script>
<style>
.config-message-editer{
  padding: 20px;
}

.config-message-editer > .editer{
  padding-right: 10px;
  border-right: 2px solid rgb(33, 150, 243);
}

</style>

