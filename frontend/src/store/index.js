import Vue from 'vue'
import Vuex from 'vuex'
import {toyStore} from './toy.store.js'
import {userStore} from './user.store.js'
import {reviewStore} from './review.store.js'
Vue.use(Vuex)

export default new Vuex.Store({
  strict:true,
  state: {
      isLoading:false,
      siteTheme:{
        color:'',
        bgColor:''
      }
  },
  getters: {
    siteTheme(state){
      return state.siteTheme
    },
      isLoading(state){
          return state.isLoading;
      }
  },
  mutations: {
    setIsLoading(state, {isLoading}){
      state.isLoading = isLoading;
  },
  setPrefs(state,{prefs}){
     state.siteTheme =prefs
     console.log('state.siteTheme:', state.siteTheme)
  }
  },
  actions: {
  },
  modules: {
    toyStore,
    userStore,
    reviewStore
  }
})
