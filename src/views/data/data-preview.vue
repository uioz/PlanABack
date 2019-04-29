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
      <data-speciality-pick label="选择要预览的专业"></data-speciality-pick>
    </template>
    <template #table-area>
      <data-preview-table></data-preview-table>
    </template>
  </data-preview-layout>
</template>
<script>
import dataPreviewLayout from "./data-preview-layout";
import dataSpecialityPick from "./data-speciality-pick";
import dataPreviewTable from './data-preview-table';

export default {
  name: "data-preview",
  components: {
    dataPreviewLayout,
    dataSpecialityPick,
    dataPreviewTable
  }
};
</script>
<style>
</style>

