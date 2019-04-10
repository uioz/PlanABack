<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <login-layout class="login">
    <template #title>title</template>
    <template #sub-title>sub-title</template>
    <template #notice>notice</template>
    <template #version>version</template>
    <template #form>
      <login-form></login-form>
    </template>
  </login-layout>
</template>
<script>
import loginLayout from "./login-layout";
import loginForm from "./login-form";

export default {
  name: "login",
  components: {
    loginLayout,
    loginForm
  },
};
</script>
<style>
</style>



