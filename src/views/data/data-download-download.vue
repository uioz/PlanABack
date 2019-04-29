<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="data-download-download">
    <data-speciality-pick label="过滤专业" v-model="selected">
      <template #prepend>
        <i-question style="margin:0 10px;" :content="tips"></i-question>
      </template>
    </data-speciality-pick>
    <mu-button color="secondary" round @click="handleDownload">点击下载</mu-button>
  </mu-paper>
</template>
<script>
import Axios from "axios";
import iQuestion from "@/components/i-question";
import dataSpecialityPick from "./data-speciality-pick";
import { mapState } from "vuex";
import { urlRouter } from "../../request/request.js";

export default {
  name: "data-download-download",
  components: {
    iQuestion,
    dataSpecialityPick
  },
  data() {
    return {
      fetching: false,
      selected: "",
      tips: "利用专业字段来过滤excel中所包含的专业,在默认情况下下载本用户可以下载的所有专业.",
      axios: Axios.create({
        method: "get",
      })
    };
  },
  methods: {
    handleDownload(){
      this.fetch('/source/'+this.selected);
    },
    beforeFetch() {
      this.fetching = true;
    },
    fetch(url) {

      this.axios({
        url
      })
        .then(response => {
          if(response){
            console.log(response);
          }
        })
        .catch(()=>{/* do nothing */})
        .finally(() => this.afterFetch());
    },
    afterFetch() {
      this.fetching = false;
    }
  },
};
</script>
<style>
.data-download-download {
  padding: 20px;
}

</style>

