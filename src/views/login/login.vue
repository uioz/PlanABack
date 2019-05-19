<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <login-layout class="login">
    <template #title>{{baseInfo? baseInfo.appname:''}}</template>
    <template #sub-title>{{baseInfo? baseInfo.school:''}}</template>
    <template #notice>{{baseInfo? baseInfo.notice:''}}</template>
    <template #version>0.1.0</template>
    <template #form>
      <login-form></login-form>
    </template>
  </login-layout>
</template>
<script>
import loginLayout from "./login-layout";
import loginForm from "./login-form";
import { mapState } from "vuex";

export default {
  name: "login",
  components: {
    loginLayout,
    loginForm
  },
  computed: {
    ...mapState(["baseInfo"])
  }
};
</script>



