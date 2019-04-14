<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-flex class="auth-login" justify-content="center">
    <mu-flex class="row" justify-content="center">
      <mu-card class="container">
        <div class="up mu-primary-color">
          <font-awesome-icon class="warning" size="10x" icon="radiation" spin />
          <mu-alert class="info" color="error">
            <font-awesome-icon style="margin-right:1em;" icon="exclamation-triangle"></font-awesome-icon>
            <span>登录过期,点击右下角完成登录!</span>
            <br>
            <span style="font-size:12px;color:#eee;">不要被表面现象所蒙骗XD</span>
          </mu-alert>
        </div>
        <div class="down">
          <mu-card-actions>
            <mu-button flat color="secondary">登录</mu-button>
          </mu-card-actions>
        </div>
      </mu-card>
    </mu-flex>
  </mu-flex>
</template>
<script>
export default {
  name: "login"
};
</script>
<style>
.auth-login {
  /* screen height minus navbar-height */
  height: calc(100vh - 64px);
  background-color: #eee;
}

.auth-login > .row {
  width: 100%;
  height: 90%;
}

.auth-login .container {
  margin: 20px 0;
  padding: 0;
  width: 80%;
  height: 70%;
}


.auth-login .container > .up {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 80%;
}

.auth-login .container > .up > .warning {
  color: #fff;
}

.auth-login .container > .up > .info {
  align-self: flex-start;
  margin-right: -20px;
  width: auto;
  font-size: 1.5em;
  line-height: 1.5em;
  display: block;
  text-align: right;
}

.auth-login .container > .down {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>


