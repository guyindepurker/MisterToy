import { toyService } from '../services/toy.service.js';
export const toyStore = {
  state: {
    toys: [],
    page: 1,
    filterBy: null,
  },
  getters: {
    toysForDisplay(state) {
      return state.toys;
    },
  },
  mutations: {
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
      state.filterBy = filterBy;
    },
  },
  actions: {
    loadToys({ commit, state }) {
      commit({ type: 'setIsLoading', isLoading: true });
      toyService.query(state.page, state.filterBy).then((toys) => {
        console.log('toys load:', toys);
        commit({ type: 'setIsLoading', isLoading: false });
        commit({ type: 'setToys', toys });
      });
    },
    saveToy({ commit }, { toy }) {
      commit({ type: 'setIsLoading', isLoading: true });
      const typeAction = toy._id ? 'updateToy' : 'saveToy';
      toyService.save(toy).then((toy) => {
        commit({ type: 'setIsLoading', isLoading: false });
        commit({ type: typeAction, toy });
      });
    },
    removeToy({ commit }, { id }) {
      console.log('id:', id);
      toyService.remove(id).then(() => {
        commit({ type: 'removeToy', id });
      });
    },
    changePage({ commit, state }, { diff }) {
      commit({ type: 'setIsLoading', isLoading: true });
      commit({ type: 'changePage', diff });
      toyService.query(state.page).then((toys) => {
        commit({ type: 'setIsLoading', isLoading: false });
        commit({ type: 'setToys', toys });
      });
    },
  },
};
