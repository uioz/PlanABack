<docs>

  intro:

  props:

  methods:

  slots:

  process:
  1. 获取专业模型
    1.1 合并到内部状态
    1.2 一份用于重置
    1.3 一份用于编辑
    1.4 一份用于卡片队列

  卡片队列中元素的数据结构:
  {
    label:string, // 当前的键名
    data:object|array // 对应的内容
  }

</docs>
<template>
  <build-content-layout class="build-model">
    <template #toolbar-area>
      <build-toolbar
        :enabled="edited"
        :edited="!fetching && edited"
        @on-save="handleSave"
        @on-reset="handleReset"
      ></build-toolbar>
    </template>
    <template #content-area>
      <build-model-card
        class="build-content-card"
        v-for="(item,index) in cardQueue"
        :key="index"
        :index="index"
        :label="item.label"
        :source="item.data"
        @pick="handleCardPick"
      ></build-model-card>
    </template>
  </build-content-layout>
</template>
<script>
import buildContentLayout from "./build-content-layout";
import buildToolbar from "./build-toolbar";
import { mapActions, mapMutations } from "vuex";
import Message from "../../plugin/musemessage.js";
import { easyClone } from "../../utils/public.js";
import buildModelCard from "./build-model-card";

export default {
  name: "build-model",
  components: {
    buildContentLayout,
    buildToolbar,
    buildModelCard
  },
  data() {
    return {
      edited: false,
      fetching: false,
      fetchData: undefined,
      fetchDataBackup: undefined,
      cardQueue: [], // 用于保存每一个横向卡片中的内容
      dialogOpen: false
    };
  },
  methods: {
    handleCardPick(index, key) {

      // index start with zero
      if (index + 1 < this.cardQueue.length) {
        this.cardQueue.splice(index + 1);
      }

      this.cardQueue.push({
        label: key,
        data: this.cardQueue[index].data[key]
      });

    },
    // ----- Split Lines
    ...mapMutations(["progressStart", "progressDone"]),
    ...mapActions(["post", "get"]),
    handleSave() {
      this.progressStart();
      this.fetching = true;

      this.post({
        target: "model",
        data: this.fetchData
      })
        .then((result = false) => {
          if (result) {
          }
        })
        .finally(() => this.progressDone());
    },
    handleReset() {
      this.fetchData = this.fetchDataBackup;
      this.edited = false;
    },
    beforeFetch() {
      this.fetching = true;
      this.fetchData = this.fetchDataBackup = undefined;
    },
    afterFetch() {
      this.fetching = false;
    },
    fetch() {
      if (this.fetching) {
        return;
      }

      this.beforeFetch();

      this.get({
        target: "model"
      })
        .then(({ data: result }) => {
          if (result) {
            this.fetchData = result;
            this.fetchDataBackup = easyClone(result);
            this.cardQueue.push({
              label: "全部专业",
              data: easyClone(result)
            });
          }
        })
        .finally(() => this.afterFetch());
    }
  },
  created() {
    this.fetch();
  },
  beforeRouteUpdate() {
    this.fetch();
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (!this.fetching) {
      return next();
    }
    Message.confirm("还没有上传完成,提前离开可能会让修改失效!", "警告", {
      type: "warning"
    }).then(({ result }) => {
      if (result) {
        next();
      } else {
        next(false);
      }
    });
  }
};
</script>
<style>
.build-model > .content {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow-x: auto;
}

.build-model .build-content-card {
  display: inline-block;
}

.build-model .build-content-card + .build-content-card {
  margin-left: 20px;
}
</style>


