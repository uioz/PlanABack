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
        <i-list-simple :lists="listData" :active-index="activeIndex" @change="handleListChange"></i-list-simple>
      </mu-paper>
    </template>
    <template #modify-area>
      <mu-paper v-if="loadedData" :z-depth="2">
        <config-message-editer :source="dataForEdit" @change="handleEditerChange"></config-message-editer>
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
    handleEditerChange(payload){
      this.beforeFetch();
      this.postAsJson({
        target:'config/message',
        data:{
          [this.activeIndex]:payload
        }
      })
      .then(response=>{
        if(response){
          this.$set(this.fetchData,this.activeIndex,payload);
        }
      })
      .finally(()=>this.afterFetch());
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
  computed:{
    loadedData(){
      return typeof this.fetchData === 'object';
    },
    /**
     * 返回用于编辑的数据, 利用 activeIndex 从 fetchData 上获取, 在
     * fetchData 未加载完成前返回 undefined 
     */
    dataForEdit(){
      return this.fetchData ? this.fetchData[this.activeIndex] || '' : undefined;
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

