<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <div class="data-preview-layout">
    <div class="select-area">
      <mu-row gutter>
        <mu-flex align-items="center" style="width:100%;">
          <mu-col span="10">
            <slot name="select-area"></slot>
          </mu-col>
          <mu-col span="2">
            <slot name="year-pick"></slot>
          </mu-col>
        </mu-flex>
      </mu-row>
    </div>
    <div class="table-area">
      <slot name="table-area"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "data-preview-layout"
};
</script>
<style>
.data-preview-layout {
  height: 100%;
}

.data-preview-layout > .select-area {
  height: 20%;
  overflow: hidden;
}

.data-preview-layout > .table-area {
  margin: 20px 0 0;
  height: calc(80% - 20px);
  scroll-behavior: smooth;
}
</style>

