<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-select class="data-speciality-pick" v-on="$listeners" v-bind="$attrs" filterable full-width>
    <mu-option
      v-for="item of selects"
      :key="item.label"
      :label="item.label"
      :value="item.value"
      ripple
    ></mu-option>
    <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>
  </mu-select>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "data-speciality-pick",
  computed: {
    ...mapState(["user"]),
    selects() {
      return this.user.controlArea.length ? this.user.controlArea.map(item=>({value:item,label:item})) : [{label:'所有专业',value:''}];
    }
  }
};
</script>

