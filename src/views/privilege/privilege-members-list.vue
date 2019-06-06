<docs>

  intro:

  props:
  value:Array<object> // 用于v-model用于驱动组件渲染的源数据

  methods:
  input():void // 用于v-model
  pick(userData:object):void // 当列表项选中的时候触发
  delete(userData:object):void // 当列表项目删除的时候触发

  slots:

  process:

</docs>
<template>
  <mu-paper class="privilege-members-list" :z-depth="2">
    <mu-list :value="activeListItem" @change="handleListActive">
      <mu-list-item button v-for="item in value" :key="item.account" :value="item.account">
        <mu-list-item-content>
          <mu-list-item-title>{{ item.account }}</mu-list-item-title>
          <mu-list-item-sub-title>{{ item.nickname }}</mu-list-item-sub-title>
        </mu-list-item-content>
        <mu-list-item-action>
          <mu-button icon color="red" @click="handleDelete(item.account)">
            <font-awesome-icon icon="times"/>
          </mu-button>
        </mu-list-item-action>
      </mu-list-item>
    </mu-list>
  </mu-paper>
</template>
<script>
import { getIndexFromDataByAccount } from "./common.js";
import { mapActions } from "vuex";
import { urlRouter } from "../../request/request.js";

export default {
  name: "privilege-members-list",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    activeListItem() {
      // 1. 如果传入了内容
      //   1.1 如果内部有选中的内容,返回选中的内容
      //   1.2 如果没有选中的内容,则使用传入内容中的第一个数据
      // 2. 返回空串
      if (this.value.length) {
        if (this.activeItemNameInner) {
          return this.activeItemNameInner;
        } else {
          return this.value[0].account;
        }
      } else {
        return "";
      }
    }
  },
  data() {
    return {
      fetching: false,
      activeItemNameInner: ""
    };
  },
  methods: {
    ...mapActions(["delete"]),
    getIndexFromDataByAccount: getIndexFromDataByAccount("value"),
    handleListActive(account) {
      this.activeItemNameInner = account;
      const userIndexInValue = this.getIndexFromDataByAccount(account);
      if (userIndexInValue !== -1) {
        this.$emit("pick", this.value[userIndexInValue]);
      }
    },
    handleDelete(account) {
      if (this.fetching) {
        return;
      }

      this.fetching = true;

      const userIndexInValue = this.getIndexFromDataByAccount(account);

      if (userIndexInValue !== -1) {

        // 复制一份数据, 以防止在上传中数据被修改
        const userData = Object.assign({},this.value[userIndexInValue]);

        this.delete({
          target: `${urlRouter("privilege/members")}/${userData.userid}`,
        })
          .then(response => {
            if (response) {
              // 移除并且触发input事件
              this.value.splice(userIndexInValue, 1);
              this.$emit("input", this.value);
              this.$emit("delete", userData);
            }
          })
          .finally(() => (this.fetching = false));
      }
    }
  }
};
</script>
<style>
.privilege-members-list {
  padding: 20px 0;
  height: 100%;
  overflow: auto;
}
</style>

