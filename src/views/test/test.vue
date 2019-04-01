<template>
  <div>

    <mu-button @click="handleRequest" color="primary">Primary</mu-button>

  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name:'test',
  methods:{
    ...mapActions(['get']),
    handleRequest(){
      this.get({
        url:'/test'
      }).then((result)=>{
        console.log(result);
      }).catch((error)=>{
        console.log(error);
      });
    }
  }
}
</script>

