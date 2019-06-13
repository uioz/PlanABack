<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <data-preview-layout class="data-preview">
    <template #select-area>
      <!-- TODO 读取可以使用的专业列表 -->
      <data-speciality-pick label="选择要预览的专业" :value="selectSpeciality" @input="handleSelectInput"></data-speciality-pick>
    </template>
    <template #year-pick>
      <data-year-pick :date="selectDate" @update:date="handleYearPick"></data-year-pick>
    </template>
    <template #table-area>
      <data-preview-table :source="dataOfRender"></data-preview-table>
    </template>
  </data-preview-layout>
</template>
<script>
import dataPreviewLayout from "./data-preview-layout";
import dataSpecialityPick from "./data-speciality-pick";
import dataPreviewTable from "./data-preview-table";
import dataYearPick from "./data-year-pick";
import { mapActions } from "vuex";

export default {
  name: "data-preview",
  components: {
    dataPreviewLayout,
    dataSpecialityPick,
    dataPreviewTable,
    dataYearPick
  },
  data() {
    return {
      selectSpeciality: "",
      selectDate: new Date(),
      dataOfRender: [],
      fetchData: {},
      fetching: false,
      pageIndex: 1
    };
  },
  methods: {
    ...mapActions(["getAsJson"]),
    handleYearPick(value) {
      this.selectDate = value;
      this.fetch(this.makeUrl(), this.makeQuery());
    },
    handleSelectInput(value) {
      this.selectSpeciality = value;
      this.fetch(this.makeUrl(), this.makeQuery());
    },
    makeUrl() {
      const baseUrl = "/api/source/json/";
      return (
        baseUrl +
        `${this.selectDate.getFullYear()}/${this.pageIndex * 20 - 19}/to/${this
          .pageIndex * 20}`
      );
    },
    makeQuery() {
      return this.selectSpeciality
        ? {
            speciality: this.selectSpeciality
          }
        : {};
    },
    beforeFetch() {
      this.fetching = true;
      this.dataOfRender = [];
    },
    fetch(url, query) {
      if (this.fetching) {
        return;
      }

      if (this.fetchData[url]) {
        this.dataOfRender = this.fetchData[url];
        return;
      }

      this.beforeFetch();

      this.getAsJson({
        url,
        data: query,
      })
        .then(response => {
          if (response) {
            // It doesn't need reactivity
            this.fetchData[url] = response.data.data;
            this.dataOfRender = this.fetchData[url];
          }
        })
        .finally(() => this.afterFetch());
    },
    afterFetch() {
      this.fetching = false;
    }
  },
  created(){
    this.fetch(this.makeUrl(),this.makeQuery());
  }
};
</script>

