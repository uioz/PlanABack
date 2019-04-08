<template>
  <div class="index">
    index
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
      this.drawerOpen = !this.drawerOpen;
    }
  }
};
</script>
<style>
</style>


