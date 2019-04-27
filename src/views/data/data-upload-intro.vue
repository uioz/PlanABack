<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="data-upload-intro" :z-depth="1">
    <h2>提示</h2>
    <mu-alert color="success">
      <font-awesome-icon icon="bars"/>
      this is success alert
    </mu-alert>
    <mu-alert color="warning">
      <font-awesome-icon icon="bars"/>
      this is warning alert
    </mu-alert>
    <mu-alert color="info">
      <font-awesome-icon icon="bars"/>
      this is info alert
    </mu-alert>
    <mu-alert color="error">
      <font-awesome-icon icon="bars"/>
      this is error alert
    </mu-alert>
  </mu-paper>
</template>
<script>
export default {
  name: "data-upload-intro"
};
</script>
<style>
.data-upload-intro {
  padding: 20px;
}

.data-upload-intro > div+div{
  margin-top: 10px;
}

</style>

