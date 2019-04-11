<docs>

  intro:
  该组件负责login(登录)页面的布局,这个组件只负责布局所以只拥有插槽,另外此组件使用了v-once指令

  props:

  methods:

  slots:
  title // 标题内容
  subTitle // 子标题内容
  notice // 通知内容
  version // 版本号码
  form // 表单区域

  process:

</docs>
<template>
  <div class="login-layout">
    <mu-card class="container" :raised="true">
      <mu-row class="row">
        <mu-col span="7"  md="6" sm="12">
          <div class="left-area">
            <h1 class="title i-single-row">
              <slot name="title"></slot>
            </h1>
            <p class="sub-title">
              <slot name="sub-title"></slot>
            </p>
            <div class="notice">
              <h4>通知</h4>
              <pre><slot name="notice">暂无</slot></pre>
            </div>
            <div
              class="footer i-single-row"
            >--v <slot name="version"></slot></div>
          </div>
        </mu-col>
        <mu-col span="5" md="6" sm="12">
          <div class="right-area">
            <slot name="form"></slot>
          </div>
        </mu-col>
      </mu-row>
    </mu-card>
  </div>
</template>
<script>
export default {
  name: "login-layout"
};
</script>
<style>
.login-layout {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  overflow-x: hidden;
}

.login-layout > .container {
  padding: 0;
  min-width: 60%;
  max-width: 1400px;
}

.login-layout > .container > .row,
.login-layout > .container > .row > .col,
.login-layout > .container > .row > .col .left-area,
.login-layout > .container > .row > .col .right-area {
  height: 90vh;
}

.login-layout > .container > .row > .col .left-area {
  background: #ff5252;
  padding: 0 20px;
  overflow: hidden;
}

.login-layout .title,
.login-layout .sub-title {
  user-select: none;
}

.login-layout h1.title {
  color: #fafafa;
  border-bottom: 1px solid #ffc107;
}

.login-layout p.sub-title {
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  color: #eee;
}

.login-layout div.notice {
  margin-top: 100px;
  min-width: 300px;
  max-width: 60%;
  height: 300px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 4px;
  background-color: rgb(255, 250, 235);
  box-shadow: 2px 2px 12px -2px #0000003b;
  overflow-y: scroll;
  padding: 0 10px;
}

.login-layout div.notice h4 {
  color: #424242;
}

.login-layout div.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 10px;
  padding-left: 10px;
  color: #eee;
  width: 10em;
  border-left: 1px solid #ffc107;
}

.login-layout > .container > .row > .col .right-area{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}

</style>


