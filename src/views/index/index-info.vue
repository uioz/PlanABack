<template>
  <div class="index-info">
    <mu-card>
      <mu-list>
        <mu-list-item button v-for="item in formatedSource" :key="item.name">
          <mu-list-item-action>
            <font-awesome-icon :icon="item.icon"></font-awesome-icon>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{ item.name }}</mu-list-item-title>
            <mu-list-item-sub-title>{{ item.label }}</mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </mu-card>
  </div>
</template>
<script>
import timeAgo from "../../plugin/timeago.js";
import { runningTime } from "../../utils/public.js";

export default {
  name: "index-info",
  props: {
    source: {
      type:Object,
      default(){
        return {};
      }
    }
  },
  computed: {
    formatedSource() {
      function getDate(key, value) {
        if (key === "nickName") {
          return value;
        }

        if (key === "lastLoginTime") {
          return timeAgo(value);
        }

        if (key === "runingTime") {
          return runningTime(value);
        }

        return new Date(value).toLocaleString();
      }

      function getName(params) {
        switch (params) {
          case "nickName":
            return "管理员名称";
          case "lastLoginTime":
            return "上次登录时间";
          case "startTime":
            return "服务器开放时间";
          case "endTime":
            return "服务器结束时间";
          case "runingTime":
            return "服务器运行时长";
        }
      }

      function getIcon(key) {
        switch (key) {
          case "nickName":
            return "user-circle";
          case "lastLoginTime":
            return "laptop";
          case "startTime":
            return "hourglass-start";
          case "endTime":
            return "hourglass-end";
          case "runingTime":
            return "stopwatch";
        }
      }

      return Object.keys(this.source).map(objKey => {
        return {
          name: getName(objKey),
          label: getDate(objKey, this.source[objKey]),
          icon: getIcon(objKey)
        };
      });
    }
  }
};
</script>

