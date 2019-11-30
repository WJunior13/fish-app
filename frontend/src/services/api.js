import axios from 'axios';
import store from '@/vuex';

const api = axios.create({
 baseURL: 'https://back-end-fishapp.herokuapp.com',
// baseURL: 'http://localhost:8181'
});

api.interceptors.request.use(config => {
  const { id } = store.state.sessao.usuario;
  config.headers.idUsuario = id;

  return config;
});

export default api;
