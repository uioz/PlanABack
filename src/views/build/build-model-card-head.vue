<docs>

  intro:
  用于构建模型的内容区域中的卡片项目中的标题.

  props:
  label:string // 展示的问题

  methods:
  remove():void // 当点击清空的时候触发

  slots:

  process:

</docs>
<template>
  <mu-paper class="build-model-card-head">
    <p class="i-single-row" style="width:20em" :title="label">{{label}}</p>
    <mu-button small flat color="secondary" @click="$emit('remove')">全部删除</mu-button>
  </mu-paper>
</template>
<script>
export default {
  name: "build-model-card-head",
  props: {
    label: {
      type: String
    }
  }
};
</script>
<style>
.build-model-card-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border: 1px solid rgb(251,53,105);
}

.build-model-card-head > p {
  margin: 0;
}
</style>

