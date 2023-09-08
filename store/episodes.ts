import { defineStore } from "pinia";

export const useEpisodesStore = defineStore({
  id: 'episodes',
  state: () => {
    return {
      episodes: [],
    }
  },

  actions: {
  },

  persist: {
    storage: persistedState.localStorage,
  },

  // persist: {
  //   storage: persistedState.cookiesWithOptions({
  //     sameSite: 'strict',
  //   }),
  // },
})


