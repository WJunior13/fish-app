import Vue from 'vue';
import Vuex from 'vuex';

import socket from '@/services/socket';
import socketPlugin from './plugins/socket';

import sessao from './modules/sessao';

const ws = socketPlugin(socket);

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    sessao,
  },
  plugins: [ws],
  strict: debug,
});
