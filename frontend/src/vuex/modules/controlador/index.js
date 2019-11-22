/* eslint-disable no-shadow */
const state = {
  controlador: {
    temp: 21.8,
    tempMin: 18,
    tempMax: 22,
    time1: 0,
    time2: 0,
    time3: 0,
  },
};

const getters = {};

const actions = {};

const mutations = {
  setDataDevice(vuexState, payload) {
    vuexState.controlador = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
