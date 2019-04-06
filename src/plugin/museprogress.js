import 'muse-ui-progress/dist/muse-ui-progress.css';
import Vue from 'vue';
import NProgress from "muse-ui-progress";

Vue.use(NProgress,{
  zIndex: 2000,          // progress z-index
  top: 0,                // position fixed top
  speed: 300,            // progress speed
  color: 'secondary',      // color
  size: 2,               // progress size
  //className: ''          // progress custom class
});