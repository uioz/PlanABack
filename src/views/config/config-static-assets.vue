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
    <config-static-assets-photo v-model="fetchData" @delete="handlePhotosDelete"></config-static-assets-photo>
    <i-upload-simple
      accept="image/jpeg, image/png"
      class="button"
      color="primary"
      :disabled="fetching"
      @change="handleUploadFile"
    >上传图片</i-upload-simple>
  </mu-paper>
</template>
<script>
import iUploadSimple from "@/components/i-upload-simple";
import configStaticAssetsPhoto from "./config-static-assets-photo";
import { mapActions } from "vuex";
import { urlRouter } from "../../request/request.js";

export default {
  name: "config-static-assets",
  components: {
    configStaticAssetsPhoto,
    iUploadSimple
  },
  data() {
    return {
      fetchData: undefined,
      fetching: false,
    };
  },
  methods: {
    ...mapActions(["get","uploadForm","delete"]),
    handlePhotosDelete(imageData){
      this.delete({
        url:`${urlRouter('config/static/photos')}/${imageData.id}`,
      });
    },
    beforeFetch() {
      this.fetching = true;
    },
    handleUploadFile(fileList){

      if(this.fetching){
        return;
      }

      this.beforeFetch();

      this.uploadForm({
        target:'config/static/photos',
        data:fileList[0] // 只获取第一个文件对象, 在 formdata 中名称为 file
      }).then(response=>{
        if(response){
          // 上传完成后将返回的内容连接到本地数组中
          this.fetchData = this.fetchData.concat(response.data.data);
        }
      }).finally(()=>this.afterFetch());

    },
    fetch() {
      if (this.fetching) {
        return;
      }

      this.get({
        target: "config/static/photos"
      })
        .then(response => {
          if (response) {
            this.fetchData = response.data.data;
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
.config-static-assets {
  padding: 20px;
  height: 100%;
  overflow: auto;
}

.config-static-assets > .button {
  margin: 10px 0 0;
}

.config-static-assets > .config-static-assets-photo {
  height: 90%;
  overflow: auto;
}
</style>

