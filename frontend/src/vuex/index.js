import Vue from 'vue';
import Vuex from 'vuex';

import sessao from './modules/sessao';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    sessao,
  },
  strict: debug,
});
