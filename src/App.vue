<template>
  <div id="app">
    <i-navbar v-show="!fullContent" @drawerClick="handleNavbarClick" ></i-navbar>
    <i-drawer v-show="!fullContent" :open.sync="drawerOpen" ></i-drawer>
    <router-view/>
  </div>
</template>
<script>
import iNavbar from "@/components/i-navbar";
import iDrawer from "@/components/i-drawer";
import { mapState } from "vuex";

export default {
  name:'app',
  components:{
    iNavbar,
    iDrawer
  },
  computed:{
    ...mapState(['fullContent'])
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

.i-pull-left{
  float: left;
}

.i-pull-right{
  float: right;
}

.i-bg-center{
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.i-single-row{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.clearfix:after {
    content: ''; display: table; clear: both;
}

/* hack css */

.i-progress{
  position: fixed!important;
}

</style>
