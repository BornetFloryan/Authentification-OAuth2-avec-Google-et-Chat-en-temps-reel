import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: null,
  },
  mutations: {
    setAuth(state, auth) {
      state.auth = auth;
    },
  },
  actions: {
    async fetchAuth({ commit }) {
      try {
        const response = await axios.get('http://localhost:5000/api/current_user');
        commit('setAuth', response.data || false);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'authentification :', error);
        commit('setAuth', false);
      }
    },
  },
});