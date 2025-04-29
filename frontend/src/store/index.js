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
        const response = await axios.get('http://localhost:5000/api/current_user', { withCredentials: true });
        commit('setAuth', response.data || false);
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'authentification :', error);
        commit('setAuth', false);
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post(
            'http://localhost:5000/auth/local',
            { email, password },
            { withCredentials: true }
        );
        commit('setAuth', response.data || false);
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        throw error;
      }
    },
    async logout({ commit }) {
      try {
        await axios.get('http://localhost:5000/auth/logout', { withCredentials: true });
        commit('setAuth', false);
      } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
      }
    },
    async checkAuth({ dispatch }) {
      await dispatch('fetchAuth');
    },
  },
});