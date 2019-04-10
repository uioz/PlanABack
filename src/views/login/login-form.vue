<template>
  <mu-form class="login-form" ref="form" :model="FormData" label-width="80px">
    <mu-form-item label="用户名" prop="account" :rules="FormRules.accountRules">
      <mu-text-field v-model="FormData.account" prop="account" >
        <template #prepend>
          <font-awesome-icon icon="user-circle"></font-awesome-icon>
        </template>
      </mu-text-field>
    </mu-form-item>
    <mu-form-item label="密码" prop="password" :rules="FormRules.passwordRules">
      <mu-text-field type="password" v-model="FormData.password" prop="password">
        <template #prepend>
          <font-awesome-icon icon="lock"></font-awesome-icon>
        </template>
      </mu-text-field>
    </mu-form-item>
    <mu-form-item>
      <mu-flex class="flex-wrapper" justify-content="end" style="width:100%;">
        <mu-button color="secondary" @click="submit" :disabled="lock">登录</mu-button>
      </mu-flex>
    </mu-form-item>
  </mu-form>
</template>
<script>
import * as validate from "../../utils/validates.js";
import {  mapActions} from "vuex";
import sha1 from "sha1";

export default {
  name: "login-form",
  data() {
    return {
      FormRules: {
        accountRules: [
          { validate: validate.required, message: "请填写用户名称" },
          { validate: validate.noSpace, message: "用户名称中不能包含空白字符" },
          { validate: validate.CnEnAndUndeline, message: "用户名称由中英文和下划线组成" },
          { validate: validate.range(2,10), message: "用户名称需要在2到10位之间" },
        ],
        passwordRules: [
          { validate: validate.required, message: "请填写密码" },
          { validate: validate.noSpace, message: "密码中不能包含空白字符" },
          { validate: validate.password, message: "密码以字母开头由英文数字和下划线组成" },
          { validate: validate.range(6,16), message: "密码需要在6到16位之间" },
        ]
      },
      FormData: {
        account: "",
        password: ""
      },
      lock:false
    };
  },
  methods: {
    ...mapActions(['requestLogin']),
    async submit() {
      if(await this.$refs.form.validate()){
        this.lock = true;
        if(await this.requestLogin(this.FormData)){
          console.log('ok')
          this.$router.push('/');
        }
        console.log('not ok')
        this.lock = false;
      }
    },
  }
};
</script>
<style>
.login-form {
  padding: 0 20px;
}
</style>


