<docs>

  intro:

  props:

  methods:
  user-add(userData:object):void // 当用户添加成功的时候触发

  slots:

  process:

</docs>
<template>
  <mu-form :model="FormData" ref="form">
    <mu-form-item label="账号" prop="account" :rules="FormRules.account">
      <mu-text-field v-model="FormData.account"></mu-text-field>
    </mu-form-item>
    <mu-form-item label="昵称" prop="nickname" :rules="FormRules.nickname">
      <mu-text-field v-model="FormData.nickname"></mu-text-field>
    </mu-form-item>
    <mu-form-item label="密码" prop="password" :rules="FormRules.password">
      <mu-text-field type="password" v-model="FormData.password"></mu-text-field>
    </mu-form-item>
    <mu-form-item>
      <mu-button color="secondary" :disabled="!canSubmit" @click="fetch">提交</mu-button>
    </mu-form-item>
  </mu-form>
</template>
<script>
import { easyClone } from "../../utils/public.js";
import * as validate from "../../utils/validates.js";
import { mapActions } from "vuex";
import sha1 from "sha1";

export default {
  name: "privilege-members-create",
  data() {
    return {
      FormData: {
        account: "",
        nickname: "",
        password: ""
      },
      FormRules: {
        account: [
          { validate: validate.required, message: "请填写账号" },
          { validate: validate.noSpace, message: "账号中不能包含空白字符" },
          {
            validate: validate.CnEnAndUndeline,
            message: "账号由中英文和下划线组成"
          },
          { validate: validate.range(2, 10), message: "账号需要在2到10位之间" }
        ],
        nickname: [
          { validate: validate.required, message: "请填写昵称" },
          {
            validate: validate.CnEnAndUndeline,
            message: "昵称由中英文和下划线组成"
          },
          { validate: validate.range(1, 10), message: "昵称需要在1到10位之间" }
        ],
        password: [
          { validate: validate.required, message: "请填写密码" },
          { validate: validate.noSpace, message: "密码中不能包含空白字符" },
          {
            validate: validate.password,
            message: "密码以字母开头由英文数字和下划线组成"
          },
          { validate: validate.range(6, 16), message: "密码需要在6到16位之间" }
        ]
      },
      fetching: false, // 请求中
      edited: false // 已经被编辑
    };
  },
  methods: {
    ...mapActions(["postAsJson"]),
    beforeFetch() {
      this.fetching = true;
    },
    async fetch() {

      if (this.fetching) {
        return;
      }

      if (await this.$refs.form.validate()) {
        
        this.beforeFetch();

        const data = easyClone(this.FormData);
        data.password = sha1(data.password);

        if (await this.postAsJson({ target: "privilege/members", data })) {
          delete data.password;
          this.$emit("user-add", data);
        }

        this.afterFetch();
        
      }
    },
    afterFetch() {
      this.fetching = false;
    }
  },
  computed: {
    canSubmit() {
      return !this.fetching && this.edited;
    }
  },
  watch: {
    FormData: {
      handler() {
        this.edited = true;
      },
      deep: true
    }
  }
};
</script>
<style>
</style>

