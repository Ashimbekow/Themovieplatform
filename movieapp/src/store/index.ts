import { createStore } from "vuex";

interface Film {
  id: number;
  title: string;
  year: number;
  genre: string;
  rating: number;
  description: string;
  imageUrl: string;
}

interface State {
  films: Film[];
}

const store = createStore<State>({
  state: {
    films: [],
  },
  getters: {
    getFilmById: (state) => (id: number) => {
      return state.films.find((film) => film.id === id) || null;
    },
  },
  mutations: {
    ADD_FILM(state, film: Film) {
      state.films.push(film);
    },
    UPDATE_FILM(state, updatedFilm: Film) {
      const index = state.films.findIndex((film) => film.id === updatedFilm.id);
      if (index !== -1) {
        state.films[index] = updatedFilm;
      }
    },
    DELETE_FILM(state, filmId: number) {
      state.films = state.films.filter((film) => film.id !== filmId);
    },
  },
  actions: {
    addFilm({ commit }, film: Film) {
      commit("ADD_FILM", film);
    },
    updateFilm({ commit }, film: Film) {
      commit("UPDATE_FILM", film);
    },
    deleteFilm({ commit }, filmId: number) {
      commit("DELETE_FILM", filmId);
    },
  },
});

export default store;
