import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import * as uiv from 'uiv';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.vue';
import router from './routes';
import store from '@/vuex';

Vue.use(uiv);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  data: {
    usuario: {
      email: '',
      nome: '',
    },
    logado: false,
  },
  render: h => h(App),
}).$mount('#app');
