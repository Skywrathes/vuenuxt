import { defineStore } from "pinia";
import { Character, Info, CharactersData } from "~/types";
import axios from "axios";
export const useCharacterStore = defineStore({
  id: "character",
  state: () => {
    return {
      characters: [] as Character[],
      info: {} as Info,
      selectedName: "",
      selectedStatus: "all",
      prevSelectedName: "",
      prevSelectedStatus: "",
      page: 1,
      notFound: false,
      isLoading: false,
    };
  },
  actions: {
    async getFilteredCharacters(endpoint: string) {
      try {
        const data = (await axios.get(endpoint)) as { data: unknown };
        const resultData = data.data as CharactersData;
        this.setData(resultData);
        this.page = 1;
        this.notFound = false;
      } catch (error) {
        if (error instanceof axios.AxiosError) {
          this.notFound = true;
        }
      }
    },

    async setData(data: CharactersData) {
      this.characters = data.results;
      this.info = data.info;
    },

    async nextPage() {
      if (this.page < this.info.pages) {
        const nextPageUrl = this.info.next;
        try {
          this.isLoading = true;
          const response = await axios.get(nextPageUrl);
          const data = response.data;
          this.page++;
          this.characters = data.results;
          this.info = data.info;
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      }
    },
    async prevPage() {
      if (this.page > 1) {
        const prevPageUrl = this.info.prev;
        try {
          this.isLoading = true;
          const response = await axios.get(prevPageUrl);
          const data = response.data;
          this.page--;
          this.characters = data.results;
          this.info = data.info;
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      }
    },

    async filterCharacters() {
      if (
        this.selectedName !== this.prevSelectedName ||
        this.selectedStatus !== this.prevSelectedStatus
      ) {
        if (
          this.selectedName &&
          this.selectedStatus &&
          this.selectedStatus !== "all"
        ) {
          this.getFilteredCharacters(
            `https://rickandmortyapi.com/api/character/?name=${this.selectedName}&status=${this.selectedStatus}`
          );
        }
        if (
          !this.selectedName &&
          this.selectedStatus &&
          this.selectedStatus !== "all"
        ) {
          this.getFilteredCharacters(
            `https://rickandmortyapi.com/api/character/?status=${this.selectedStatus}`
          );
        }

        if (this.selectedStatus === "all" && this.selectedName) {
          this.getFilteredCharacters(
            `https://rickandmortyapi.com/api/character/?name=${this.selectedName}`
          );
        }

        if (this.selectedStatus === "all" && this.selectedName === "") {
          this.getFilteredCharacters(
            `https://rickandmortyapi.com/api/character/?page=1`
          );
        }
        this.prevSelectedName = this.selectedName;
        this.prevSelectedStatus = this.selectedStatus;
      }
    },
  },

  persist: {
    storage: persistedState.localStorage,
  },

  //possible to use it in case of secure data saving
  // persist: {
  //   storage: persistedState.cookiesWithOptions({
  //     sameSite: 'strict',
  //   }),
  // },
});
