const state = {
  logado: false,
  loader: false,
  token: null,
  usuario: {
    id: '',
    email: '',
    senha: '',
    nome: '',
    telefone: '',
  },
};

const getters = {};

const actions = {};

const mutations = {
  setLogado(vuexState, payload) {
    if (!payload) {
      vuexState.usuario = {
        id: '',
        email: '',
        senha: '',
        nome: '',
        telefone: '',
      };
    }
    vuexState.logado = payload;
  },
  setLoader(vuexState, payload) {
    vuexState.loader = payload;
  },
  setUsuario(vuexState, payload) {
    vuexState.usuario = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
