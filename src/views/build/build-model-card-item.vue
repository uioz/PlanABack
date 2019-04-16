<docs>

  intro:
  用于构建模型的内容区域中的卡片项目中的每条项目.

  props:
  label:string // 用于标签名称

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="build-model-card-item">
    <mu-text-field v-model="newLabel" :max-length="10" :label="label" label-float>
      <template #append>
        <mu-button small icon color="error">
          <font-awesome-icon icon="bars"/>
        </mu-button>
      </template>
    </mu-text-field>
  </mu-paper>
</template>
<script>
export default {
  name: "build-model-card-item",
  props: {
    label: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newLabel: ""
    };
  }
};
</script>
<style>
.build-model-card-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
</style>

