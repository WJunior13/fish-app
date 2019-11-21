import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/pages/home';
import Login from '@/pages/login';
import Monitoring from '@/pages/monitoring';
import Cadastro from '@/components/Cadastro.vue';
import Controlador from '@/components/Controlador.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/home', name: 'home', component: Home },
    { path: '/monitoring', name: 'monitoring', component: Monitoring },
    { path: '/cadastro', name: 'cadastro', component: Cadastro },
    { path: '/controlador', name: 'controlador', component: Controlador },
  ],
});