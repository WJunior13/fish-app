import store from '@/vuex';

export default function isAuthenticated() {
  return store.state.sessao.logado;
}
