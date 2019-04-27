<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="data-upload-upload" :z-depth="2">
    <mu-select label="查看我可以上传的专业" filterable  v-model="selected" full-width>
      <mu-option
        v-for="speciality of selects"
        :key="speciality"
        :label="speciality"
        :value="speciality"
        ripple
      ></mu-option>
      <template #prepend>
        <i-question style="margin:0 10px;" :content="tips"></i-question>
      </template>
    </mu-select>
    <mu-button color="secondary" round @click="handleUpload">点击上传</mu-button>
    <!-- see https://stackoverflow.com/questions/11832930/html-input-file-accept-attribute-file-type-csv -->
    <input
      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      ref="file"
      type="file"
      style="display:none;"
      @change="handleFileChange"
    >
  </mu-paper>
</template>
<script>
import { mapState } from "vuex";
import iQuestion from "@/components/i-question";
import Axios from "axios";
import { urlRouter } from "../../request/request.js";

export default {
  name: "data-upload-upload",
  components: {
    iQuestion
  },
  created(){

  },
  computed: {
    ...mapState(["user"]),
    selects() {
      return this.user.controlArea.length ? this.user.controlArea : ['所有专业'];
    }
  },
  data() {
    return {
      fetching:false,
      progress:0,
      selected:'',
      tips:"这个列表中的专业是你可以上传的,此列表之外的其他专业都会被系统忽略.",
      axios:Axios.create({
        headers:{
          'Content-Type':'multipart/form-data'
        },
        url:urlRouter('upload/source'),
        method:'post',
        responseType:'application/json'
      })
    };
  },
  methods:{
    handleUpload(){
      this.$refs.file.click();
    },
    makeFormData(file){
      let formData = new FormData();
      formData.append('file',file);
      return formData;
    },
    handleFileChange(event){
      this.fetch(this.makeFormData(event.srcElement.files[0]));
    },
    beforeFetch(){
      this.fetching = true;
    },
    fetch(data){
      this.beforeFetch();
      this.axios({
        data,
        onUploadProgress(event){
          // TODO change progress when uploading.
        }
      }).then(()=>{

      }).catch(()=>{

      }).finally(()=>this.afterFetch());
    },
    afterFetch(){
      this.fetching = false;
    }
  }
};
</script>
<style>
.data-upload-upload {
  padding: 20px;
}
</style>

