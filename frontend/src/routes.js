import Vue from 'vue';
import Router from 'vue-router';

import isAuthenticated from '@/utils/authMiddleware';

import Home from '@/pages/home';
import Login from '@/pages/login';
import Monitoring from '@/pages/monitoring';
import Cadastro from '@/pages/register';
import Controlador from '@/pages/controller';

Vue.use(Router);

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { private: false } },
  { path: '/home', name: 'home', component: Home, meta: { private: false } },
  { path: '/register', name: 'register', component: Cadastro, meta: { private: false } },
  { path: '/monitoring', name: 'monitoring', component: Monitoring, meta: { private: true } },
  { path: '/controller', name: 'controller', component: Controlador, meta: { private: true } },
];

const router = new Router({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (!routes.some(route => route.path === to.path)) {
    return next('/login');
  }

  if (to.meta.private) {
    if (!isAuthenticated()) {
      return next('/login');
    }

    if (!routes.some(route => route.path === to.path)) {
      return next('/monitoring');
    }
  }
  next();
});

export default router;
