<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <div class="build-model-card">
    <build-model-card-head v-if="!lastCard" :label="label" @cancel="handleCancelAll"></build-model-card-head>
    <build-model-card-item
      v-for="item of transformedSource"
      :key="item"
      :label="item"
      @pick="handleItemPick"
      @change="handleItemChange"
      @remove="handleItemRemove"
    ></build-model-card-item>
    <build-model-card-plus></build-model-card-plus>
  </div>
</template>
<script>
import buildModelCardHead from "./build-model-card-head";
import buildModelCardItem from "./build-model-card-item";
import buildModelCardPlus from './build-model-card-plus';


export default {
  name: "build-model-card",
  components: {
    buildModelCardHead,
    buildModelCardItem,
    buildModelCardPlus
  },
  props: {
    label: {
      type: String,
      default: "所有专业"
    },
    index: {
      type: Number,
      required: true
    },
    source: {
      type: [Array, Object],
      required: true
    }
  },
  computed: {
    lastCard() {
      return Array.isArray(this.source);
    },
    transformedSource() {
      if (this.lastCard) {
        return this.source;
      } else {
        return Object.keys(this.source);
      }
    }
  },
  methods: {
    handleCancelAll() {
      console.log("cancelAll");
    },
    handleItemPick() {
      console.log("itemPick");
    },
    handleItemRemove() {
      console.log("itemRemove");
    },
    handleItemChange() {
      console.log("itemChange");
    }
  }
};
</script>
<style>
.build-model-card {
  height: 100%;
  width: 250px;
  overflow-y: auto;
}

.build-model-card .build-model-card-item,
.build-model-card .build-model-card-plus {
  margin-top: 10px;
}
</style>

