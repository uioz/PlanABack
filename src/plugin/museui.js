import Vue from "vue";
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import theme from 'muse-ui/lib/theme';
// import * as colors from 'muse-ui/lib/theme/colors';

theme.add('my-theme',{
  // primary:'rgb(81,234,234)',
  secondary:'rgb(251,53,105)',
  // success,
  warning:'rgb(255,157,118)',
  info:'rgb(81,234,234)',
  // error
});

theme.use('my-theme');

Vue.use(MuseUI);