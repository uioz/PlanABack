<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="privilege-management" :z-depth="5">
    <mu-data-table height="100%" :columns="columns" :data="fetchData" :min-col-width="50">
      <template #default="{row}">
        <td>{{row.account}}</td>
        <td>
          <mu-select
            chips
            multiple
            separator="/"
            v-model="row.controlarea"
            full-width
            @change="handleSelectChange(row)"
          >
            <template #prepend>
              <i-question content="选择为空表示这个用户可以管理所有的专业"></i-question>
            </template>
            <mu-option v-for="(item,index) in specalties" :key="index" :label="item" :value="item"></mu-option>
          </mu-select>
        </td>
        <td>
          <mu-checkbox v-model="row.power.upload" @change="handleCheckedChange(row)"></mu-checkbox>
        </td>
        <td>
          <mu-checkbox v-model="row.power.download" @change="handleCheckedChange(row)"></mu-checkbox>
        </td>
        <td>
          <mu-checkbox v-model="row.power.view" @change="handleCheckedChange(row)"></mu-checkbox>
        </td>
        <td>
          <mu-checkbox v-model="row.power.edit" @change="handleCheckedChange(row)"></mu-checkbox>
        </td>
        <td>
          <mu-checkbox v-model="row.power.static" @change="handleCheckedChange(row)"></mu-checkbox>
        </td>
        <td>
          <mu-checkbox v-model="row.power.management" @change="handleCheckedChange(row)"></mu-checkbox>
        </td>
      </template>
    </mu-data-table>
  </mu-paper>
</template>
<script>
import buildContentLayout from "@/views/build/build-content-layout";
import iToolbar from "@/components/i-toolbar";
import iQuestion from "@/components/i-question";
import { Privilege } from "@/utils/privilege";
import { easyAssign } from "@/utils/public";
import { mapActions, mapMutations } from "vuex";

const columns = [
  {
    title: "账号",
    name: "account",
    cellAlign: "center",
    width: 100
  },
  {
    title: "管理专业范围",
    name: "controlarea",
    cellAlign: "center",
    width: 600
  },
  {
    title: "上传",
    name: "upload",
    cellAlign: "center"
  },
  {
    title: "下载",
    name: "download",
    cellAlign: "center"
  },
  {
    title: "在线预览",
    name: "view",
    cellAlign: "center"
  },
  {
    title: "模型编辑",
    name: "edit",
    cellAlign: "center"
  },
  {
    title: "消息管理",
    name: "static",
    cellAlign: "center"
  },
  {
    title: "人员修改",
    name: "management",
    cellAlign: "center"
  }
];

export default {
  name: "privilege-management",
  components: {
    buildContentLayout,
    iToolbar,
    iQuestion
  },
  data() {
    return {
      edited: false,
      fetching: false,
      fetchData: [],
      columns,
      specalties: []
    };
  },
  methods: {
    ...mapActions(["get", "postAsJson", "requestSpecalties"]),
    ...mapMutations(["progressStart", "progressDone"]),
    handleSelectChange(rowData) {
      if (this.fetching) {
        return;
      }

      this.beforeFetch();
      this.progressStart();
      this.postAsJson({
        target: "privilege/management",
        account: rowData.account,
        controlarea: rowData.controlarea
      }).finally(() => {
        this.afterFetch();
        this.progressDone();
      });
    },
    handleCheckedChange(rowData) {
      if (this.fetching) {
        return;
      }

      this.beforeFetch();
      this.progressStart();
      this.postAsJson({
        target: "privilege/management",
        data: {
          account: rowData.account,
          level: Privilege.numberIfy(Privilege.rawCodeIfy(rowData.power))
        }
      }).finally(() => {
        this.afterFetch();
        this.progressDone();
      });
    },
    beforeFetch() {
      this.fetching = true;
    },
    fetch() {
      if (this.fetching) {
        return;
      }
      this.beforeFetch();

      // 自动报错和获取当前年份下的所有专业
      this.requestSpecalties().then(
        specalties => (this.specalties = specalties)
      );

      this.get({
        target: "privilege/management"
      })
        .then(response => {
          if (response) {
            this.fetchData = response.data.data.map(item => {
              return easyAssign(
                item,
                {
                  power: Privilege.parse(item.level)
                },
                true
              );
            });
          }
        })
        .finally(() => this.afterFetch());
    },
    afterFetch() {
      this.fetching = false;
    }
  },
  created() {
    this.fetch();
  }
};
</script>
<style>
.privilege-management{
  height: 100%;
}
</style>
