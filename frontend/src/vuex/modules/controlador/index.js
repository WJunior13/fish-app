/* eslint-disable no-shadow */
import socket from '@/services/socket';
import Vue from 'vue';

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
      enable1: false,
      enable2: false,
      enable3: false,
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

    Vue.set(vuexState.controlador, 'config', {
      ...payload,
      enable1: payload.enable1 == '0' ? false : true,
      enable2: payload.enable2 == '0' ? false : true,
      enable3: payload.enable3 == '0' ? false : true,
    });
    // vuexState.controlador.config = payload;
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
