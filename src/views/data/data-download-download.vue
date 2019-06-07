<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="data-download-download" :z-depth="2">
    <div class="i-flat-row pick-year" >
      <div style="font-size:16px;">选择年份:</div>
      <div style="margin-left:10px;">
        <data-year-pick :date="selectDate" @update:date="handleYearPick"></data-year-pick>
      </div>
    </div>
    <mu-button color="secondary" round @click="handleDownload">点击下载</mu-button>

  </mu-paper>
</template>
<script>
import Axios from "axios";
import iQuestion from "@/components/i-question";
import dataYearPick from "./data-year-pick";
import { mapActions } from "vuex";
import { urlRouter } from "../../request/request.js";

export default {
  name: "data-download-download",
  components: {
    iQuestion,
    dataYearPick
  },
  data() {
    return {
      fetching: false,
      selectDate: new Date(),
      tips:
        "利用专业字段来过滤excel中所包含的专业,在默认情况下下载本用户可以下载的所有专业."
    };
  },
  methods: {
    ...mapActions(["get"]),
    handleYearPick(newDate){
      this.selectDate = newDate;
    },
    handleDownload() {
      this.fetch();
    },
    beforeFetch() {
      this.fetching = true;
    },
    fetch() {
      if (this.fetching) {
        return;
      }

      let a = document.createElement('a');

      a.href = this.downloadLink;
      a.target = '_self';
      a.click();

      a = null;

      this.afterFetch();

    },
    afterFetch() {
      this.fetching = false;
    }
  },
  computed:{
    downloadLink(){
      return `${urlRouter("source/fetch")}/${this.selectDate.getFullYear()}`
    }
  }
};
</script>
<style>
.data-download-download {
  padding: 20px;
}
.data-download-download > .pick-year{
  margin: 10px 0;
}
</style>

