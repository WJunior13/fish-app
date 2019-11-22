import Vue from 'vue';
import Router from 'vue-router';

import isAuthenticated from '@/utils/authMiddleware';

import Home from '@/pages/home';
import Login from '@/pages/login';
import Monitoring from '@/pages/monitoring';
import Cadastro from '@/components/Cadastro.vue';
import Controlador from '@/components/Controlador.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { private: false } },
    { path: '/home', name: 'home', component: Home, meta: { private: false } },
    { path: '/monitoring', name: 'monitoring', component: Monitoring, meta: { private: true } },
    { path: '/cadastro', name: 'cadastro', component: Cadastro, meta: { private: true } },
    { path: '/controlador', name: 'controlador', component: Controlador, meta: { private: true } },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.private) {
    if (!isAuthenticated()) {
      return next('/login');
    }
  }
  next();
});

export default router;
