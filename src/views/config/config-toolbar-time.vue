<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <span class="config-toolbar-time">当前时间&nbsp;{{dateTime}}</span>
</template>
<script>
export default {
  name:'config-toolbar-time',
  created(){
    this.timer = setInterval(() => {
      this.dateTime = new Date().toLocaleString();
    }, 1000);
  },
  data(){
    return {
      timer:undefined,
      dateTime:undefined
    }
  },
  destroyed(){
    clearInterval(this.timer);
  }
}
</script>

