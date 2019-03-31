import Vue from "vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee,faBars,faSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCoffee, faBars, faSlash);

Vue.component('font-awesome-icon', FontAwesomeIcon);