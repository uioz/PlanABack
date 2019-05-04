<docs>

  intro:

  props:
  source:object={startTime:Date,endTime:Date} // 用于初始化时间范围

  methods:
  change(dataRange:object) // 当时间修改的时候触发,以及添加防抖函数

  slots:

  process:

</docs>
<template>
  <mu-row gutter class="config-switch-content">
    <mu-col :span="12" :sm="12" :md="12" :lg="12" :xl="12">
      <mu-tabs
        :value.sync="tabIndex"
        style="margin-bottom:20px;"
        inverse
        color="secondary"
        text-color="rgba(0, 0, 0, .54)"
        center
      >
        <mu-tab value="startTime">客户端开启时间</mu-tab>
        <mu-tab value="endTime">客户端关闭时间</mu-tab>
      </mu-tabs>
    </mu-col>
    <mu-col :span="12" :sm="12" :md="12" :lg="6" :xl="6">
      <mu-paper :z-depth="2">
        <mu-date-picker landscape :date.sync="dateRange[tabIndex]"></mu-date-picker>
      </mu-paper>
    </mu-col>
    <mu-col :span="12" :sm="12" :md="12" :lg="6" :xl="6">
      <mu-paper :z-depth="2">
        <mu-time-picker format="24hr" landscape :time.sync="dateRange[tabIndex]"></mu-time-picker>
      </mu-paper>
    </mu-col>
  </mu-row>
</template>
<script>
import { _debounce } from "@/utils/public.js";

export default {
  name: "config-switch-content",
  props: {
    source: {
      type: Object,
      default() {
        return {
          startTime: new Date(),
          endTime: new Date()
        };
      }
    }
  },
  data() {
    const formatData = ({ startTime, endTime }) => {
      return {
        startTime: new Date(startTime),
        endTime: new Date(endTime)
      };
    };

    return {
      tabIndex: "startTime",
      dateRange: formatData(this.source)
    };
  },
  watch: {
    dateRange: {
      deep: true,
      handler: _debounce(function () {
        console.log('trigger')
        this.$emit('change',this.dateRange);
      },1000)
    }
  }
};
</script>

