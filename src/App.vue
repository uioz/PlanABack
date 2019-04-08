<template>
  <div id="app">
    <i-navbar @drawerClick="handleNavbarClick" ></i-navbar>
    <i-drawer :open.sync="drawerOpen" ></i-drawer>
    <router-view/>
  </div>
</template>
<script>
import iNavbar from "@/components/i-navbar";
import iDrawer from "@/components/i-drawer";

export default {
  name:'app',
  components:{
    iNavbar,
    iDrawer
  },
  data(){
    return {
      drawerOpen:false
    }
  },
  methods:{
    handleNavbarClick(){
      this.drawerOpen = !this.drawerOpen;
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.clearfix:after {
    content: ''; display: table; clear: both;
}

/* hack css */

</style>
