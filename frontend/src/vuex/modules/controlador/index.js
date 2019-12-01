/* eslint-disable no-shadow */
import socket from '@/services/socket';

const state = {
  controladores: [],
  controlador: {
    temp: 0,
    config: {
      tempMin: 0,
      tempMax: 0,
      time1: null,
      time2: null,
      time3: null,
      enableTime1: false,
      enableTime2: false,
      enableTime3: false,
    }
  },
};

const getters = {};

const actions = {
  buscarConfiguracao({commit}){
    socket.emit('buscarConfiguracao');

    socket.on('servidor:buscarConfiguracao', configuracao=>{
      commit('setConfig', configuracao);
    })
  }
};

const mutations = {
  setTemp(vuexState, payload) {
    const { temp } = payload;
    vuexState.controlador.temp = temp;
  },

  setConfig(vuexState, payload) {
    console.log('configuracao do servidor', payload);

    vuexState.controlador.config = payload;
  },

  setControladores(vuexState, payload) {
    vuexState.controladores = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
