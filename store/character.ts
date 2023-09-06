import { defineStore } from "pinia";
import { Character, Info } from "~/types";
export const useCharacterStore = defineStore({
  id: 'character',
  state: () => {
    return {
      characters: [] as Character[],
      info: [] as Info[],
    }
  },

  actions: {
    async getCharacters() {
      const { data } = await useFetch("https://rickandmortyapi.com/api/character") as {data: any};
      this.characters = data.value.results;
      this.info = data.value.info;
      },
      async filterCharacters(name: string) {
        const { data } = await useFetch(`https://rickandmortyapi.com/api/character/?name=${name}`) as {data: any};
        this.characters = data.value.results;
        this.info = data.value.info;
        }
  },

  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: 'strict',
    }),
  },
})

// persist: {
//   storage: persistedState.localStorage,
// },
