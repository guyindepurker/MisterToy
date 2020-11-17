import Vue from 'vue'
import Vuex from 'vuex'
import {toyStore} from './toy.store.js'
Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  state: {
      isLoading:false,
  },
  getters: {
      isLoading(state){
          return state.isLoading;
      }
  },
  mutations: {
    setIsLoading(state, {isLoading}){
      state.isLoading = isLoading;
  },
  },
  actions: {
  },
  modules: {
    toyStore
  }
})
