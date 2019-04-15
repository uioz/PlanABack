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
      <build-toolbar
        :enabled="edited"
        :edited="!fetching && edited"
        @on-save="handleSave"
        @on-reset="handleReset"
      ></build-toolbar>
    </template>
    <template #content-area>
      <div>content-area</div>
    </template>
  </build-content-layout>
</template>
<script>
import buildContentLayout from "./build-content-layout";
import buildToolbar from './build-toolbar';
import { mapActions, mapMutations } from "vuex";
import Message from "../../plugin/musemessage.js";
import { easyClone } from "../../utils/public.js";

export default {
  name: "build-model",
  components: {
    buildContentLayout,
    buildToolbar
  },
  data() {
    return {
      edited: false,
      fetching: false,
      fetchData: undefined,
      fetchDataBackup:undefined,
      dialogOpen: false
    };
  },
  methods: {
    ...mapMutations(["progressStart", "progressDone"]),
    ...mapActions(["post","get"]),
    handleSave() {
      this.progressStart();
      this.fetching = true;

      this.post({
        target: "model",
        data: this.fetchData
      })
        .then((result = false) => {
          if (result) {
          }
        })
        .finally(() => this.progressDone());
    },
    handleReset(){
      this.fetchData = this.fetchDataBackup;
      this.edited = false;
    },
    beforeFetch(){
      this.fetching = true;
      this.fetchData = this.fetchDataBackup =  undefined;
    },
    afterFetch(){
      this.fetching = false;
    },
    fetch(){

      if(this.fetching){
        return;
      }

      this.beforeFetch();

      this.get({
        target:'model'
      }).then(({data:result})=>{
        if(result){
        this.fetchData = result;
        this.fetchDataBackup = easyClone(result);
      }
      })
      .finally(()=>this.afterFetch());

    }
  },
  created() {
    this.fetch();
  },
  beforeRouteUpdate(){
    this.fetch();
    next();
  },
  beforeRouteLeave(to, from, next) {
    if(!this.fetching){
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

