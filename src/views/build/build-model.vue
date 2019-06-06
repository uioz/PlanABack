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
        @save="handleSave"
        @reset="handleReset"
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
        @remove-all="handleCardRemoveAll"
        @remove="handleItemRemove"
        @change="handleItemChange"
        @plus-item="handleItemPlus"
      ></build-model-card>
    </template>
  </build-content-layout>
</template>
<script>
import buildContentLayout from "./build-content-layout";
import buildToolbar from "./build-toolbar";
import Message from "../../plugin/musemessage.js";
import buildModelCard from "./build-model-card";
import { mapActions, mapMutations } from "vuex";
import { easyClone } from "../../utils/public.js";

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
    };
  },
  methods: {
    handleItemPlus(index, parentKey, inputText, isResultSet) {
      const getCollectlyNode = () => (isResultSet ? [] : {}),
        target = this.cardQueue[index].data;

      let result = undefined;
      // add from cardQuee
      if (Array.isArray(target)) {
        target.push(inputText);
        result = target;
      } else {
        this.$set(target, inputText, getCollectlyNode());
        result = target[inputText];
      }

      // add from fetchData
      let addTarget = this.fetchData;

      if (index > 0) {
        let i = 1;
        while (i < index) {
          addTarget = addTarget[this.cardQueue[i].label];
          i++;
        }
        this.$set(addTarget[parentKey], inputText, result);
      } else {
        this.$set(addTarget, inputText, result);
      }
    },
    handleItemChange(index, parentKey, childKey, inputText) {
      // change from cardQueue
      const target = this.cardQueue[index].data;
      let changeOfArray = false,
        result = undefined;

      if (Array.isArray(target)) {
        changeOfArray = true;
        this.$set(target, target.indexOf(childKey), inputText);
        result = target;
      } else {
        this.$set(target, inputText, target[childKey]);
        this.$delete(target, childKey);
        result = target[childKey];
      }
      // 如果有下个卡片且是当前被修改项目的后代,修正这个后代的标签名称
      if (
        this.cardQueue[index + 1] &&
        this.cardQueue[index + 1].label === childKey
      ) {
        this.cardQueue[index + 1].label = inputText;
      }

      // change from fetchData
      let changeTarget = this.fetchData;
      if (index > 0) {
        let i = 1;
        while (i < index) {
          changeTarget = changeTarget[this.cardQueue[i].label];
          i++;
        }
      }

      const correctlyKey = index > 0 ? parentKey : childKey;

      if (changeOfArray) {
        this.$set(changeTarget, correctlyKey, result);
      } else {
        this.$set(changeTarget, inputText, result);
        this.$delete(changeTarget, correctlyKey);
      }
    },
    handleItemRemove(index, fatherLabel, childLabel) {
      // remove from cardQueue
      const target = this.cardQueue[index].data;
      if (Array.isArray(target)) {
        this.$delete(target, target.indexOf(childLabel));
        // 如果删除完成后没有内容了则清空选中的卡片
        if (target.length === 0) {
          return this.handleCardRemoveAll(index, fatherLabel);
        }
      } else {
        this.$delete(target, childLabel);
        // 如果删除完成后没有内容了则清空选中的卡片
        if (Object.keys(target).length === 0) {
          return this.handleCardRemoveAll(index, fatherLabel);
        }
        // 如果后代是自身则移出这个卡片
        if (
          this.cardQueue[index + 1] &&
          this.cardQueue[index + 1].label === childLabel
        ) {
          this.cardQueue.splice(index + 1);
        }
      }

      // remove from fetchData
      let deleteTarget = this.fetchData;
      if (index > 0) {
        let i = 1;
        while (i < index) {
          deleteTarget = deleteTarget[this.cardQueue[i].label];
          i++;
        }
        deleteTarget = deleteTarget[fatherLabel];
      }

      if (Array.isArray(deleteTarget)) {
        this.$delete(deleteTarget, deleteTarget.indexOf(childLabel));
      } else {
        this.$delete(deleteTarget, childLabel);
      }
    },
    handleCardRemoveAll(index, key) {
      // remove from fetchData
      let target = this.fetchData;

      let i = 1;
      // index start with zero
      while (i < index) {
        target = target[this.cardQueue[i].label];
        i++;
      }
      this.$delete(target, key);
      // remove from card
      this.cardQueue.splice(index);
      if (--index >= 0) {
        this.$delete(this.cardQueue[index].data, key);
      }
    },
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
        .then(result => {
          if (result) {
            // TODO 响应成功
          }
        })
        .finally(() => {
          this.afterFetch();
          this.progressDone();
        });
    },
    handleReset() {
      this.cardQueue = [
        {
          label: "",
          data: (this.fetchData = easyClone(this.fetchDataBackup))
        }
      ];
      this.$nextTick(() => {
        this.edited = false;
      });
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
        .then(response => {

          if(response){
            
            const data = response.data.data;

            this.fetchData = data;
            this.fetchDataBackup = easyClone(data);
            this.cardQueue.push({
              label: "",
              data: easyClone(data)
            });

          }

        })
        .finally(() => this.afterFetch());

    }
  },
  watch: {
    fetchData: {
      deep: true, // 开启深度响应式
      handler: function(newvalue, oldvalue) {
        // 如果oldvalue为undefined说明此时
        // 数据刚刚获取
        if (oldvalue !== undefined) {
          this.edited = true;
        }
      }
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
/* hack build-content-layout */
.build-model > .content {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
}

.build-model .build-content-card {
  display: inline-block;
}

.build-model .build-content-card + .build-content-card {
  margin-left: 20px;
}
</style>


