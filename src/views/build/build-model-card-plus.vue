<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="build-model-card-plus">
    <mu-text-field v-model="inputText" full-width label-float help-text="回车后添加新的字段">
      <font-awesome-icon icon="plus"></font-awesome-icon>
    </mu-text-field>
    <br>
  </mu-paper>
</template>
<script>
export default {
  name: "build-model-card-plus",
  data() {
    return {
      inputText: ""
    };
  }
};
</script>
<style>
.build-model-card-plus {
  padding: 10px;
  border: 1px solid rgb(66, 66, 66);
}
</style>