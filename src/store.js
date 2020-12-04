import Vue from 'vue'
import Vuex from 'vuex'

import { loadUserData, setUserData, clearUser } from '@/common/cache/cache'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: loadUserData(),
  },
  getters: {
    user(state) {
      return state.userData || ''
    },
    baseUrl(){
      return window.baseUrl
    }
  },
  mutations: {
    SET_USER_DATA (state, user) {
      state.userData = user
    },
  },
  actions: {
    saveUserData({commit}, user) {
      commit('SET_USER_DATA', setUserData(user))
    },
    clearUserData({commit}) {
      commit('SET_USER_DATA', clearUser())
    }
  }
})
