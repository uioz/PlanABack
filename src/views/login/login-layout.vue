<docs>

  intro:
  该组件负责login(登录)页面的布局,这个组件只负责布局所以只拥有插槽,另外此组件使用了v-once指令

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <div class="login-layout">
    <mu-card class="container" :raised="true">
      <mu-row class="row">
        <mu-col span="7">
          <div class="left-area">
            <h1
              class="title i-single-row"
            >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam dolore fugiat, hic aspernatur at veniam atque similique. Omnis odio ducimus, molestiae, ad deserunt voluptatibus delectus hic iusto quidem, magnam ratione.</h1>
            <p class="sub-title">pre-choice classification system V0.1.0.</p>
            <div class="notice">
              <h4>通知</h4>
              <!-- TODO shadown -->
            </div>
          </div>
        </mu-col>
        <mu-col span="5">
          <div class="right-area"></div>
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
  width: 60%;
  height: 90%;
  min-height: 90%;
}

.login-layout > .container > .row,
.login-layout > .container > .row > .col,
.login-layout > .container > .row > .col > .left-area {
  height: 100%;
}

.login-layout > .container > .row > .col > .left-area {
  position: relative;
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
  min-width: 200px;
  max-width: 60%;
  height: 300px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 4px;
  background-color: rgb(255, 250, 235);
  box-shadow: 2px 2px 12px -2px #0000003b;
}

.login-layout div.notice h4 {
  text-indent: 2em;
  color: #424242;
}
</style>


