import Vue from 'vue';
import Vuex from 'vuex';

import socket from '@/services/socket';
import socketPlugin from './plugins/socket';

import sessao from './modules/sessao';
import controlador from './modules/controlador';

const ws = socketPlugin(socket);

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    sessao,
    controlador,
  },
  plugins: [ws],
  strict: debug,
});
