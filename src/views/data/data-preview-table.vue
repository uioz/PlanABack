<docs>

  intro:

  props:
  source:Array<object> // 用于驱动表格渲染

  methods:

  slots:

  process:

</docs>
<template>
<mu-paper class="data-preview-table" :z-depth="2">
  <mu-data-table :columns="tableColums" :data="source">
    <template #default="{row}">
      <td>{{row.name}}</td>
      <td>{{row.number}}</td>
      <td>{{row.speciality}}</td>
      <td>{{row.ss}}</td>
      <td>{{row.score}}</td>
      <td>{{row.specialityPath}}</td>
    </template>
  </mu-data-table>
</mu-paper>
</template>
<script>
const tableColums = [
  {
    title: "名称",
    name: "name",
    cellAlign: "left",
    align: "left"
  },
  {
    title: "考生号",
    name: "number",
    cellAlign: "left",
    align: "left"
  },
  {
    title: "所属专业",
    name: "speciality",
    align: "left",
    cellAlign: "left"
  },
  {
    title: "所在地区",
    name: "ss",
    cellAlign: "left",
    align: "left"
  },
  {
    title: "测试成绩",
    name: "score",
    align: "left",
    cellAlign: "left"
  },
  {
    title: "预选专业路径",
    name: "specialityPath",
    align: "left",
    cellAlign: "left"
  }
  // {
  //   title: "所选专业",
  //   name: "result",
  //   align: "left",
  //   cellAlign: "left",
  // }
];

export default {
  name: "data-preview-table",
  props:{
    source:Array
  },
  data(){
    return {
      tableColums
    }
  }
};
</script>
<style>
.data-preview-table {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
</style>

