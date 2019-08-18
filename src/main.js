import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import Login from '@/components/Login.vue'
import Init from '@/components/Init.vue'
import Cadastro from '@/components/Cadastro.vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Router from 'vue-router'

Vue.use(Router)


Vue.use(BootstrapVue)
Vue.config.productionTip = false


const router=new Router({
  mode:'history',
  routes: [
    
    { path: '/login', name:'login',component: Login },
    { path: '/home', name:'home',component: Home },
    { path: '/init', name:'init',component: Init },
    { path: '/cadastro',name:'cadastro',  component: Cadastro },
    
  ]
});
new Vue({
  
  data: {
    usuario: {
      nome: '',
    },
    logado: false
  },
 
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  
  
 
  render: h => h(App),
}).$mount('#app')
