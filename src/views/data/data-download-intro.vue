<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="data-download-intro" :z-depth="1">
    <h2>提示</h2>
    <mu-alert color="info">
      <div>
        <p>默认情况下会下载本年份的在当前用户管理范围内部的数据.</p>
        <p>如果选择了历年的数据, 用户的管理范围不会是当时的管理范围依然是当前年份的 .</p>
        <p>如果想要获取完整的年份, 建议使用最高权限用户或者使用可以管理所有专业的用户来进行获取 .</p>
      </div>
    </mu-alert>
  </mu-paper>
</template>
<script>
export default {
  name: "data-download-intro"
};
</script>
<style>
.data-download-intro {
  padding: 20px;
}

.data-download-intro > div+div{
  margin-top: 10px;
}

</style>

