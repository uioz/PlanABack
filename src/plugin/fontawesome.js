import Vue from "vue";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faBars, faSlash, faUserCircle, faRadiation, faExclamationTriangle, faKey, faLock,faCubes,faComment,faRocket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCoffee, faBars, faSlash, faUserCircle, faRadiation, faExclamationTriangle, faKey, faLock,faCubes,faComment,faRocket);

Vue.component('font-awesome-icon', FontAwesomeIcon);