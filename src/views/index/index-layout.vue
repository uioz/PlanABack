<template>
  <mu-container class="index-layout" fluid>
    <mu-row class="first-row" gutter>
      <mu-col span="12" sm="12" md="3" lg="3" xl="3">
        <slot name="left-area"></slot>
      </mu-col>
      <mu-col span="12" sm="12" md="9" lg="9" xl="9">
        <slot name="right-area"></slot>
      </mu-col>
    </mu-row>
  </mu-container>
</template>
<script>
export default {
  name: "index-layout"
};
</script>
<style>

.index-layout > .first-row{
  margin-top: 20px;
}
</style>


