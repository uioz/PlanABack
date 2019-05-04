<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-row gutter class="config-message-layout">
    <mu-col :lg="3" :xl="3">
      <slot name="list-area"></slot>
    </mu-col>
    <mu-col :lg="9" :xl="9">
      <slot name="modify-area"></slot>
    </mu-col>
  </mu-row>
</template>
<script>
export default {
  name: "config-message-layout"
};
</script>