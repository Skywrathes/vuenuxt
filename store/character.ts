import { defineStore } from "pinia";
import { Character, Info } from "~/types";
import axios from "axios";
export const useCharacterStore = defineStore({
  id: 'character',
  state: () => {
    return {
      characters: [] as Character[],
      info: {} as Info,
      selectedName: '',
      selectedStatus: 'all',
      prevSelectedName: '',
      prevSelectedStatus: '',
      page: 1,
    }
  },
  actions: {
    async setData(data: any) {
      this.characters = data.data.results;
      this.info = data.data.info;
    },
    async nextPage() {
      if (this.page < this.info.pages) {
        this.page++
        const nextPageUrl = this.info.next;
        try {
          const response = await axios.get(nextPageUrl);
          const data = response.data;
          this.characters = data.results;
          this.info = data.info;
        } catch (error) {
          console.error(error)
        }
      }
    },
    async prevPage() {
      if (this.page > 1) {
        this.page--;
        const prevPageUrl = this.info.prev;
        try {
          const response = await axios.get(prevPageUrl);
          const data = response.data;
          this.characters = data.results;
          this.info = data.info;
          
        } catch (error) {
          console.error(error)
        }
      }
    },
    async getCharacters() {
      try {
        const data = await axios.get("https://rickandmortyapi.com/api/character") as { data: any };
        await this.setData(data)
      } catch (error) {
        console.error(error)
      }
    },

    async filterCharacters() {
      if (this.selectedName !== this.prevSelectedName || this.selectedStatus !== this.prevSelectedStatus) {
        
        if (this.selectedName && this.selectedStatus && this.selectedStatus !== 'all') {
          try {
            const data = await axios.get(`https://rickandmortyapi.com/api/character/?name=${this.selectedName}&status=${this.selectedStatus}`) as { data: any };
            this.setData(data)
            this.page = 1;
          } catch (error) {
            console.error(error)
          }
        }
        if (this.selectedName && !this.selectedStatus) {
          try {
            const data = await axios.get(`https://rickandmortyapi.com/api/character/?name=${this.selectedName}`) as { data: any };
            this.setData(data)
            this.page = 1;
          } catch (error) {
            console.error(error)
          }
        }
        if (!this.selectedName && this.selectedStatus && this.selectedStatus !== 'all') {
          try {
            const data = await axios.get(`https://rickandmortyapi.com/api/character/?status=${this.selectedStatus}`) as { data: any };
            this.setData(data)
            this.page = 1;
          } catch (error) {
            console.error(error)
          }
        }

        if (this.selectedStatus === 'all' && this.selectedName) {
          try {
            const data = await axios.get(`https://rickandmortyapi.com/api/character/?name=${this.selectedName}`) as { data: any };
            this.setData(data)
            this.page = 1;
          } catch (error) {
            console.error(error)
          }
        }

        if (this.selectedStatus === 'all' && this.selectedName === '') {
          try {
            const data = await axios.get(`https://rickandmortyapi.com/api/character/?page=1`) as { data: any };
            this.setData(data)
            this.page = 1;
          } catch (error) {
            console.error(error)
          }
        }
        this.prevSelectedName = this.selectedName;
        this.prevSelectedStatus = this.selectedStatus;
      }
    },
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


