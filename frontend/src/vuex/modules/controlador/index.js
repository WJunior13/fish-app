/* eslint-disable no-shadow */
const state = {
  temp: 44,
  tempMin: 40,
  tempMax: 45,
  time1: 0,
  time2: 0,
  time3: 0,
};

const getters = {};

const actions = {};

const mutations = {
  setDataDevice(vuexState, payload) {
    vuexState = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
