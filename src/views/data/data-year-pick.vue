<docs>

  intro:
  该组件用于弹出式的日期选择,该组件透传了props和listeners到内部的mu-date-picker上.  
  利用这点可以你可以获取日期,详情请参阅mu-date-picker文档.  

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <div class="data-year-pick">
    <mu-button color="primary" ref="button" @click="open = !open">{{$attrs.date.getFullYear()}}</mu-button>
    <mu-popover cover :open.sync="open" :trigger="trigger">
      <mu-date-picker type="year" v-on="$listeners" v-bind="$attrs"></mu-date-picker>
    </mu-popover>
  </div>
</template>
<script>
export default {
  name: "data-year-pick",
  data() {
    return {
      open: false,
      trigger: null
    };
  },
  mounted () {
    this.trigger = this.$refs.button.$el;
  }
};
</script>
