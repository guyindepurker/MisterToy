import { toyService } from '../services/toy.service.js';
export const toyStore = {
  state: {
    toys: [],
    filterBy: null,
    toy:null
  },
  getters: {
    toysForDisplay(state) {
      return state.toys;
    },
    toyForDisplay(state){
      return state.toy
    }
  },
  mutations: {
    setToy(state,{toy}){
      state.toy = toy
      console.log('state.toy:', state.toy)
    },
    setToys(state, { toys }) {
      state.toys = toys;
    },
    saveToy(state, { toy }) {
      state.toys.unshift(toy);
    },
    removeToy(state, { id }) {
      const idx = state.toys.findIndex((toy) => toy._id === id);
      state.toys.splice(idx, 1);
    },
    updateToy(state, { toy }) {
      const idx = state.toys.findIndex((currToy) => currToy._id === toy._id);
      state.toys.splice(idx, 1, toy);
    },
    changePage(state, { diff }) {
      state.page += diff;
      if (state.page === 0 || !state.toys.length) state.page = 1;
    },
    setFilter(state, { filterBy }) {
      console.log('state.filterBy:', state.filterBy)
      state.filterBy = filterBy;
    },
  },
  actions: {
    async loadToy({commit},{toyId}){
      commit({ type: 'setIsLoading', isLoading: true });
      const toy = await toyService.getById(toyId)
      commit({type:'setToy',toy})
      setTimeout(()=>{
        commit({ type: 'setIsLoading', isLoading: false });
      },2000)
    },
    async loadToys({ commit, state }) {
      commit({ type: 'setIsLoading', isLoading: true });
     const toys = await toyService.query(state.filterBy)
        console.log('toys load:', toys);
        commit({ type: 'setToys', toys });
        setTimeout(()=>{
          commit({ type: 'setIsLoading', isLoading: false });
        },2000)
     
    },
   async saveToy({ commit }, { toy }) {
      commit({ type: 'setIsLoading', isLoading: true });
      const typeAction = toy._id ? 'updateToy' : 'saveToy';
     await toyService.save(toy)
        commit({ type: typeAction, toy });
        setTimeout(()=>{
          commit({ type: 'setIsLoading', isLoading: false });
        },2000)
      
    },
    async removeToy({ commit }, { id }) {
         await toyService.remove(id)
         commit({ type: 'removeToy', id });
     
    },
   async changePage({ commit, state }, { diff }) {
      commit({ type: 'setIsLoading', isLoading: true });
      commit({ type: 'changePage', diff });
      const toys = await toyService.query(state.page)
        commit({ type: 'setToys', toys });
        setTimeout(()=>{
          commit({ type: 'setIsLoading', isLoading: false });
        },2000)
      
    },
  },
};
