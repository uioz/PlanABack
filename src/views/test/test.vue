<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <div>
    <mu-button v-for="url in urlList" :key="url" @click="handleRequest(url)" color="primary" >{{url}}</mu-button>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name:'test',
  data(){
    return {
      urlList:[
        '/api/server/base',
        '/api/state'
      ]
    }
  },
  methods:{
    ...mapActions(['get']),
    handleRequest(url){
      this.get({
        url
      }).then((result)=>{
        console.log(result);
      }).catch((error)=>{
        console.log(error);
      });
    }
  },
  created(){
    this.$storage.set('test',{
      hello:'world'
    });
  }
}
</script>

