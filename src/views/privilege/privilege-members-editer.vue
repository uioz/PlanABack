<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="privilege-members-editer i-card-padding" :z-depth="8">
    <template v-if="!FormData">
      <p>从左侧挑选一个用户来修改基本信息</p>
      <p>
        或者
        <mu-button color="primary" @click="handleUserAdd">添加一个新的用户</mu-button>
      </p>
    </template>
    <template v-else>
      <mu-form :model="FormData" ref="form">
        <mu-form-item prop="account" label="账号" :rules="FormRules.accout" >
          <mu-text-field v-model="FormData.account" ></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="nickname" label="昵称" :rules="FormRules.nickname" >
          <mu-text-field v-model="FormData.nickname" ></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="password" label="密码" :rules="FormRules.password" >
          <mu-text-field v-model="FormData.password" ></mu-text-field>
        </mu-form-item>
        <mu-form-item>
          <mu-button color="secondary" :disabled="!shouldSubmit" @click="handleSubmit">修改</mu-button>
        </mu-form-item>
      </mu-form>
    </template>
  </mu-paper>
</template>
<script>
import * as validate from "../../utils/validates.js";
import { easyClone } from "../../utils/public.js";
import { mapActions } from "vuex";
import sha1 from "sha1";

export default {
  name: "privilege-members-editer",
  props: ["source"],
  data() {
    return {
      FormData: undefined,
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
          // { validate: validate.noSpace, message: "密码中不能包含空白字符" },
          // {
          //   validate: validate.password,
          //   message: "密码以字母开头由英文数字和下划线组成"
          // },
          // { validate: validate.range(6, 16), message: "密码需要在6到16位之间" }
        ]
      },
      fetching: false, // 获取资源中
      edited: false, // 被编辑
      watcher: undefined
    };
  },
  watch: {
    source(newValue) {

      const copyData =  easyClone(newValue);

      // that will be throw error when form was checked
      // lead to the form data haven't had key of password
      // in order to we put a password-key to form data
      copyData.password = '';
      this.FormData = copyData;
      this.edited = false;

      if (this.watcher) {
        this.watcher();
      }

      this.watcher = this.$watch("FormData", function() {
        this.edited = true;
      },{
        deep:true
      });

    }
  },
  methods: {
    ...mapActions(["postAsJson"]),
    beforeFetch() {
      this.fetching = true;
    },
    handleSubmit() {
      
      if (this.fetching) {
        return;
      }

      this.$refs.form.validate().then((result)=>{
        console.log(result);
      }).catch((error)=>{
        console.log(error);
      }).finally(()=>this.afterFetch());
      // TODO 测试更新内容
      // TODO 后端记得区别user下的更新和新增

      // if (await this.$refs.form.validate()) {
      //   this.beforeFetch();
      //   await this.postAsJson({
      //     target: "privilege/members",
      //     data: this.FormData
      //   });
      //   this.afterFetch();
      // }
    },
    afterFetch() {
      this.fetching = false;
    },
    handleUserAdd() {
      // model
    }
  },
  computed:{
    shouldSubmit(){
      return !this.fetching && this.edited
    }
  }
};
</script>
<style>
</style>

