import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import axios from 'axios';
import numeral from 'numeral';
import numFormat from 'vue-filter-number-format';
import vSelect from 'vue-select';

import App from './App.vue';

import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/css/font-template.css';
import './assets/css/sb-admin-2.min.css';
import './assets/fontawesome-free/css/all.min.css';
import 'vue-select/dist/vue-select.css';

Vue.filter('numFormat', numFormat(numeral));

Vue.prototype.$http = axios;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
Vue.component('v-select', vSelect);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
