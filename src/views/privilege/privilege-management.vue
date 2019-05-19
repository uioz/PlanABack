<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <build-content-layout class="privilege-management">
    <template #toolbar-area>
      <i-toolbar :edited="edited"></i-toolbar>
    </template>
    <template #content-area>
      <mu-paper style="height:100%" :z-depth="5">
        <mu-data-table height="100%" :columns="columns" :data="fetchData" >
          <template #default="{row}">
            <td>{{row.account}}</td>
            <td>{{row.controlarea}}</td>
            <td><mu-checkbox v-model="row.power.upload" @change="handleCheckedChange(row)" ></mu-checkbox></td>
            <td><mu-checkbox v-model="row.power.download" @change="handleCheckedChange(row)" ></mu-checkbox></td>
            <td><mu-checkbox v-model="row.power.view" @change="handleCheckedChange(row)" ></mu-checkbox></td>
            <td><mu-checkbox v-model="row.power.edit" @change="handleCheckedChange(row)" ></mu-checkbox></td>
            <td><mu-checkbox v-model="row.power.static" @change="handleCheckedChange(row)" ></mu-checkbox></td>
            <td><mu-checkbox v-model="row.power.management" @change="handleCheckedChange(row)" ></mu-checkbox></td>
          </template>
        </mu-data-table>
      </mu-paper>
    </template>
  </build-content-layout>
</template>
<script>
import buildContentLayout from "@/views/build/build-content-layout";
import iToolbar from "@/components/i-toolbar";
import { mapActions,mapMutations } from "vuex";
import { Privilege } from "../../utils/privilege";
import { easyAssign } from "../../utils/public";

const columns = [
  {
    title: "账号",
    name: "account",
    cellAlign: "center"
  },
  {
    title: "管理专业范围",
    name: "controlarea",
    cellAlign: "center"
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
    iToolbar
  },
  data() {
    return {
      edited:false,
      fetching: false,
      fetchData: [],
      columns
    };
  },
  methods: {
    ...mapActions(["get","psotAsJson"]),
    ...mapMutations([]),
    handleCheckedChange(rowData){

      if(this.fetching){
        return;
      }

      this.beforeFetch();
      
      this.postAsJson({
        target:'',
        data:{
          level:Privilege.numberIfy(Privilege.rawCodeIfy(rowData.power))
        }
      }).finally(()=>this.afterFetch());

    },
    beforeFetch() {
      this.fetching = true;
    },
    fetch() {
      if (this.fetching) {
        return;
      }
      this.beforeFetch();

      this.get({
        target: "privilege/management"
      })
        .then(response => {
          if (response) {
            this.fetchData = response.data.data.map(item => {
              return easyAssign(item, {
                power:Privilege.parse(item.level)
              }, true);
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
