<docs>

  intro:

  props:

  methods:

  slots:

  process:
  1. 发起数据请求获取图片资源
    1.1 合并到内部状态
    1.2 图片列表进行渲染

</docs>
<template>
  <mu-paper class="config-static-assets" :z-depth="2">
    <config-static-assets-photo v-model="fetchData"></config-static-assets-photo>
    <mu-button class="button" color="primary" >上传图片</mu-button>
  </mu-paper>
</template>
<script>
import configStaticAssetsPhoto from './config-static-assets-photo';
import { mapActions } from "vuex";

export default {
  name:'config-static-assets',
  components:{
    configStaticAssetsPhoto
  },
  data(){
    return {
      fetchData:undefined,
      fetching:false
    }
  },
  methods:{
    ...mapActions(['get']),
    beforeFetch(){
      this.fetching = true;
    },
    fetch(){

      if(this.fetching){
        return;
      }

      this.get({
        target:'config/static/photos',
      }).then(response=>{
        if(response){
          this.fetchData = response.data.data;
        }
      }).finally(()=>this.afterFetch());

    },
    afterFetch(){
      this.fetching = false;
    }
  },
  created(){
    this.fetch();
  }
}
</script>
<style>
.config-static-assets{
  padding: 20px;
  height: 100%;
  overflow: auto;
}

.config-static-assets > .button{
  margin:10px 0 0;
}

.config-static-assets > .config-static-assets-photo{
  height: 90%;
  overflow: auto;
}

</style>

