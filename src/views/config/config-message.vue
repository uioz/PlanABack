<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <config-message-layout class="config-message">
    <template #list-area>
      <mu-paper :z-depth="2">
        <i-list-simple :lists="listData" @change="handleListChange"></i-list-simple>
      </mu-paper>
    </template>
    <template #modify-area>
      <mu-paper v-if="!!fetchData" :z-depth="2">
        <config-message-editer :source="fetchData[activeIndex]" @change="handleEditerChange"></config-message-editer>
      </mu-paper>
    </template>
  </config-message-layout>
</template>
<script>
import iListSimple from "@/components/i-list-simple";
import configMessageLayout from "./config-message-layout";
import configMessageEditer from './config-message-editer';
import { mapActions } from "vuex";

export default {
  name: "config-message",
  components: {
    configMessageLayout,
    configMessageEditer,
    iListSimple
  },
  data() {
    return {
      listData: [
        {
          label: "系统应用名称",
          faIcon: "terminal",
          index: "systemName"
        },
        {
          label: "客户端应用名称",
          faIcon: "mobile",
          index: "clientName"
        },
        {
          label: "系统公告",
          faIcon: "broadcast-tower",
          index: "systemMessage"
        },
        {
          label: "客户端公告",
          faIcon: "bullhorn",
          index: "clientMessage"
        }
      ],
      activeIndex:'systemName',
      fetchData:undefined,
      fetching:false
    };
  },
  methods: {
    ...mapActions(['get','postAsJson']),
    handleEditerChange(){
      // TODO 发送数据
      // TODO 检测 editer 为何payload是数组格式
      // this.postAsJson({
      //   target:'',
      //   data:{
      //     [this.activeIndex]:''
      //   }
      // })
    },
    beforeFetch(){
      this.fetching = true;
    },
    fetch(){

      if(this.fetching){
        return;
      }

      this.beforeFetch();

      this.get({
        target:'config/message'
      }).then(response=>{
        if(response){
          this.fetchData = response.data.data;
        }
      }).finally(()=>this.afterFetch());

    },
    afterFetch(){
      this.fetching = false;
    },
    handleListChange(index) {
      this.activeIndex = index;
    }
  },
  created(){
    this.fetch();
  },
  beforeRouteUpdate(){
    this.fetch();
  }
};
</script>
<style>
</style>

