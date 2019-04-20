<docs>

  intro:
  用于构建模型的内容区域中的卡片项目中的每条项目.

  props:
  label:string // 用于标签名称

  methods:
  pick(label:string):void // 当标签被点击(空白处)的时候触发
  remove(label:string):void // 当点击移除的时候触发
  change(label:string,text:string):void // 当输入内容回车后触发

  slots:

  process:

</docs>
<template>
  <mu-paper class="build-model-card-item" @click="$emit('pick',label)">
    <mu-button
      title="删除该项目"
      class="times"
      small
      icon
      color="grey"
      @click.stop="$emit('remove',label)"
    >
      <font-awesome-icon icon="times"/>
    </mu-button>
    <mu-tooltip placement="left" content="回车完成编辑">
      <mu-text-field
        v-model="inputText"
        @click.stop
        @keyup.enter="handleEnter"
        full-width
        :max-length="10"
        :label="label"
        label-float
        :error-text="errorText"
      ></mu-text-field>
    </mu-tooltip>
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
      errorText: "",
      inputText: "",
      timeOutId: undefined
    };
  },
  methods: {
    handleEnter() {
      if (this.inputText) {
        this.$emit("change",this.label,this.inputText);
      } else {
        if (this.timeOutId) {
          clearTimeout(this.timeOutId);
        }

        this.errorText = "请先输入内容";

        this.timeOutId = setTimeout(() => {
          this.errorText = "";
        }, 2000);
      }
    }
  }
};
</script>
<style>
.build-model-card-item {
  position: relative;
  padding: 10px;
  border: 1px solid rgb(33, 150, 243);
}

.build-model-card-item > .times {
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
  z-index: 1;
}
</style>

