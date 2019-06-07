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
  </mu-paper>
</template>
<script>
import iQuestion from "@/components/i-question";
import { makeFormData } from "@/utils/public.js";
import dataSpecialityPick from "./data-speciality-pick";
import { mapActions, mapMutations } from "vuex";
import { urlRouter } from "../../request/request.js";

export default {
  name: "data-upload-upload",
  components: {
    iQuestion,
    dataSpecialityPick
  },
  data() {
    return {
      fetching: false,
      progress: 0,
      selected: "",
      tips: "这个列表中的专业是你可以上传的,此列表之外的其他专业都会被系统忽略."
    };
  },
  methods: {
    ...mapActions(["uploadForm"]),
    ...mapMutations(["progressStart", "progressDone"]),
    handleUpload() {
      this.$refs.file.click();
    },
    makeFormData,
    handleFileChange(event) {
      this.fetch(this.makeFormData(event.srcElement.files[0]));
    },
    beforeFetch() {
      this.fetching = true;
      this.progressStart();
    },
    fetch(data) {
      if (this.fetching) {
        return;
      }

      this.beforeFetch();

      this.uploadForm({
        // TODO 提供年份的选择
        target: urlRouter(`source/upload/${new Date().getFullYear()}`),
        data
      })
        .then(response => {
          if (response) {
            debugger;
          } else {
            // TODO 提示错误
          }
        })
        .finally(() => this.afterFetch());

    },
    afterFetch() {
      this.fetching = false;
      this.progressDone();
    }
  }
};
</script>
<style>
.data-upload-upload {
  padding: 20px;
}

.data-upload-upload .progress {
  margin-top: 10px;
}
</style>

