<template>
  <build-content-layout class="build-notice">
    <template #toolbar-area>
      <build-toolbar
        :enabled="edited"
        :edited="!fetching && edited"
        @save="handleSave"
        @reset="handleReset"
      ></build-toolbar>
    </template>
    <template #content-area>
      <build-notice-card
        v-for="(item,index) in cardQueue"
        :key="index"
        :index="index"
        :label="item.label"
        :source="item.data.lists"
        @set-all="handleSetAll"
        @remove-all="handleRemoveAll"
        @pick-item="handlePickItem"
        @edit-item="handleEditItem"
      ></build-notice-card>
    </template>
  </build-content-layout>
</template>
<script>
import buildContentLayout from "./build-content-layout";
import buildNoticeCard from "./build-notice-card";
import Message from "../../plugin/musemessage.js";
import buildToolbar from "./build-toolbar";
import { mapActions, mapMutations } from "vuex";
import { easyClone } from "../../utils/public.js";

export default {
  name: "build-notice",
  components: {
    buildContentLayout,
    buildNoticeCard,
    buildToolbar
  },
  data() {
    return {
      fetching: false,
      edited: false,
      fetchData: undefined,
      fetchDataBackup: undefined,
      cardQueue: [] // 用于保存每一个横向卡片中的内容
    };
  },
  methods: {
    handleEditItem() {
      console.log("editItem");
    },
    handlePickItem(index, parentKey, childKey) {
      this.cardQueue.splice(index + 1);
      let [target] = this.cardQueue[index].data.lists.filter(
        value => value.name === childKey
      );
      this.cardQueue.push({
        label: childKey,
        data: target
      });
      console.log(this.cardQueue);
    },
    handleRemoveAll(index, label) {
      // remove from cardQueue

      if (index === 0) {
        this.cardQueue[index].data.lists.forEach(value => {
          value.notice = "";
        });
      }

      // remove from fetchData
      let target = this.fetchData.lists,
        i = 1;

      while (i < index) {
        [target] = target.lists.filter(
          value => value.name === this.cardQueue[i].label
        );
        i++;
      }

      target.lists.forEach(value => (value.notice = ""));
    },
    handleSetAll() {
      console.log("set all");
    },
    handleSave() {
      console.log("save");
    },
    handleReset() {
      console.log("reset");
    },
    ...mapMutations(["progressStart", "progressDone"]),
    ...mapActions(["post", "get"]),
    cardInit() {
      // 添加lists键,消除和普通结构的差异化
      this.cardQueue = [
        {
          label: "",
          data: {
            lists: easyClone(this.fetchData)
          }
        }
      ];
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
      this.progressStart();
      this.get({
        target: "speciality"
      })
        .then(response => {
          if (response) {
            this.fetchData = response.data;
            this.fetchDataBackup = easyClone(response.data);
            this.cardInit();
          }
        })
        .finally(() => {
          this.progressDone();
          this.afterFetch();
        });
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
.build-notice > .content{
  display: inline-block;
  white-space: nowrap;
  width: 100%;
}

.build-notice .build-notice-card{
  display: inline-block;
}

.build-notice .build-notice-card+.build-notice-card{
  margin-left: 10px;
}

</style>

