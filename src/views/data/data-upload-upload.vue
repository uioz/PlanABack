<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="data-upload-upload" :z-depth="2">
    <data-speciality-pick label="查看我可以上传的专业" v-model="selected">
      <template #prepend>
        <i-question style="margin:0 10px;" :content="tips"></i-question>
      </template>
    </data-speciality-pick>
    <mu-button color="secondary" round @click="handleUpload">点击上传</mu-button>
    <!-- input-accept see https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv -->
    <input
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      ref="file"
      type="file"
      style="display:none;"
      @change="handleFileChange"
    >
    <mu-linear-progress class="progress" v-show="progress" :value="progress" ></mu-linear-progress>
  </mu-paper>
</template>
<script>
import Axios from "axios";
import iQuestion from "@/components/i-question";
import { makeFormData } from "@/utils/public.js";
import dataSpecialityPick from "./data-speciality-pick";
import { mapState } from "vuex";
import { urlRouter } from "../../request/request.js";

export default {
  name: "data-upload-upload",
  components: {
    iQuestion,
    dataSpecialityPick
  },
  data() {
    return {
      fetching:false,
      progress:0,
      selected:'',
      tips:"这个列表中的专业是你可以上传的,此列表之外的其他专业都会被系统忽略.",
      axios:Axios.create({ // 为了使用uploadprogress所以不使用封装的版本
        headers:{
          'Content-Type':'multipart/form-data'
        },
        url:urlRouter('source/upload'),
        method:'post',
        responseType:'application/json'
      })
    };
  },
  methods:{
    handleUpload(){
      this.$refs.file.click();
    },
    makeFormData,
    handleFileChange(event){
      this.fetch(this.makeFormData(event.srcElement.files[0]));
    },
    beforeFetch(){
      this.fetching = true;
      this.progress = 1;
    },
    fetch(data){
      this.beforeFetch();
      // TODO 测试上传
      // TOOD 替换upload为plugin中的axios实例
      this.axios({
        adapter:(...rest)=>{ // TODO for test
          return new Promise((resolve)=>{
            resolve({
              status:200,
            });
          })
        },
        data,
        onUploadProgress(event){
          // TODO change progress when uploading.
        }
      }).then(response=>{
        if(response && response.data){
          // TODO tips
        }
      }).catch(/* do nothing */).finally(()=>this.afterFetch());
    },
    afterFetch(){
      this.fetching = false;
      this.progress = 0;
    }
  }
};
</script>
<style>
.data-upload-upload {
  padding: 20px;
}

.data-upload-upload .progress{
  margin-top: 10px;
}
</style>

