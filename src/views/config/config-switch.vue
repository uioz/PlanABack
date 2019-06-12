<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <build-content-layout>
    <template #toolbar-area>
      <i-toolbar :edited="!fetching && edited" color="grey50" @save="handleSave">
        <template #left>
          <config-toolbar-time style="color:#333"></config-toolbar-time>
        </template>
        <mu-switch color="error" v-model="force" label="强力开启"></mu-switch>
        <i-question style="margin:0 10px;color:#666" content="无视时间限制直接允许客户端访问"></i-question>
        <mu-switch color="primary" v-model="open" label="开启"></mu-switch>
        <i-question style="margin:0 10px;color:#666" content="客户端开放开关"></i-question>
      </i-toolbar>
    </template>
    <template #content-area>
      <config-switch-content v-if="dateRange" :source="dateRange" @change="handleDataRangeChange"></config-switch-content>
    </template>
  </build-content-layout>
</template>
<script>
import buildContentLayout from "@/views/build/build-content-layout";
import iToolbar from "@/components/i-toolbar";
import iQuestion from "@/components/i-question";
import configToolbarTime from "./config-toolbar-time";
import configSwitchContent from "./config-switch-content";
import { mapActions } from "vuex";
import { easyAssign } from "@/utils/public.js";

export default {
  name: "config-switch",
  components: {
    buildContentLayout,
    iToolbar,
    iQuestion,
    configToolbarTime,
    configSwitchContent
  },
  data() {
    return {
      fetching: false,
      force: false,
      open: false,
      dateRange: undefined,
      edited: false,
      watchers: []
    };
  },
  methods: {
    ...mapActions(["get", "postAsJson"]),
    handleSave() {
      this.beforeFetch();

      const { startTime, endTime } = this.dateRange;

      this.postAsJson({
        target: "config/upload",
        data: {
          range: {
            startTime: +startTime,
            endTime: +endTime
          },
          open: this.open,
          force: this.force
        }
      })
        .then(response => {
          if (response) {
            this.edited = false;
          }
        })
        .finally(() => this.afterFetch());
    },
    handleDataRangeChange(dateRange) {
      this.dateRange = dateRange;
      this.edited = true;
    },
    watchForEdited() {
      this.watchers.push(
        this.$watch("force", function() {
          this.edited = true;
        }),
        this.$watch("open", function() {
          this.edited = true;
        })
      );
    },
    beforeFetch() {
      this.fetching = true;
    },
    async fetch() {
      this.beforeFetch();

      const force = this.get({
        target: "config/force"
      });
      const range = this.get({
        target: "config/range"
      });
      const open = this.get({
        target: "config/open"
      });

      this.force = (await force).data.data;
      this.open = (await open).data.data;
      this.dateRange = (await range).data.data;

      this.watchForEdited();

      this.afterFetch();
    },
    afterFetch() {
      this.fetching = false;
    }
  },
  destroyed() {
    for (const cacelWatcherHandle of this.watchers) {
      cacelWatcherHandle();
    }
  },
  created() {
    this.fetch();
  },
  beforeRouteUpdate() {
    this.fetch();
  }
};
</script>
<style>
</style>

