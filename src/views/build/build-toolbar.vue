<docs>

  intro:

  props:
  enabled:boolean=false // 是否启用

  methods:

  slots:

  process:

</docs>
<template>
  <i-toolbar v-bind="$attrs" v-on="$listeners">
    <template #left>
      <i-question content="点击卡片空白处查看专业结构。输入内容后回车确认修改。 选择结果集添加的专业是可以被学生选择的专业"></i-question>
    </template>
    <mu-button color="error" :disabled="!enabled" @click="$emit('reset')">重置</mu-button>
  </i-toolbar>
</template>
<script>
import iToolbar from "../../components/i-toolbar";
import iQuestion from "../../components/i-question";

export default {
  name: "build-toolbar",
  components: {
    iToolbar,
    iQuestion
  },
  props: {
    enabled: {
      type: Boolean,
      default: false
    }
  }
};
</script>
