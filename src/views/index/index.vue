<template>
  <div class="index">
    <i-navbar @drawerClick="handleNavbarClick" ></i-navbar>
    <i-drawer :open.sync="drawerOpen" ></i-drawer>
  </div>
</template>
<script>
import iNavbar from "@/components/i-navbar";
import iDrawer from "@/components/i-drawer";

export default {
  name: "index",
  components: {
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
      console.log('123')
      this.drawerOpen = !this.drawerOpen;
    }
  }
};
</script>
<style>
</style>


