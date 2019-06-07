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
    <mu-alert color="info">
      <div>
        <p>在这里可以上传学生的基本信息作为系统的数据源,</p>
        <p>文件格式可以是 xlsx 和 xls.</p>
        <p>上传的数据会根据当前用户的控制范围以及专业模型进行过滤, 不符合要求的数据会被剔除.</p>
        <p>此外还需要严格控制 excel 列的名称,excel 中错误的内容不会影响到系统的运行,</p>
        <p>但是错误的数据会被抛弃, 为了节省时间 excel 列遵守以下的顺序:</p>
      </div>
    </mu-alert>
    <mu-alert color="error">
      <ol>
        <div>列的名称以及顺序从左到右为(标题全部小写):</div>
        <li>name(学生名称)</li>
        <li>number(学生考号)</li>
        <li>speciality(顶级专业类别)</li>
        <li>level1(专业细化1)(可选)</li>
        <li>levelN(专业细化N)(可选)</li>
        <li>其余任意名称列(可选)</li>
      </ol>
    </mu-alert>
    <mu-alert color="error">
      <div>
        <p>其他注意事项:</p>
        <p>excel 中不能有任何隐藏内容以及复杂的内嵌内容和计算公式.</p>
        <p>此外系统只会读取 sheet1 中的内容, 请确保数据在 sheet1 中.</p>
      </div>
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
  height: 100%;
  overflow: auto;
}

.data-upload-intro > div + div {
  margin-top: 10px;
}
</style>

