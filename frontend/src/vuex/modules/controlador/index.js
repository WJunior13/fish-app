/* eslint-disable no-shadow */
const state = {
  controladores: [],
  controlador: {
    temp: 0,
    tempMin: 0,
    tempMax: 0,
    time1: null,
    time2: null,
    time3: null,
    enableTime1: false,
    enableTime2: false,
    enableTime3: false,
  },
};

const getters = {};

const actions = {};

const mutations = {
  setDataDevice(vuexState, payload) {
    vuexState.controlador = payload;
  },
  setTemp(vuexState, payload) {
    const { temp } = payload;
    vuexState.controlador.temp = temp;
  },
  setConfig(vuexState, payload) {
    const tempBackup = vuexState.controlador.temp;

    vuexState.controlador = payload;
    vuexState.controlador.temp = tempBackup;
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
