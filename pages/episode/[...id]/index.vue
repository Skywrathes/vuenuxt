<template>
  <section class="flex flex-col items-center m-12">
    <h1 class="mb-10 text-lg md:text-[35px] lg:text-[55px]">{{ episodeData.name }}</h1>
    <p class="mb-10 text-lg md:text-[25px] lg:text-[35px]">{{ episodeData.air_date }}</p>
    <div class="grid grid-cols-2 xl:grid-cols-5 sm:grid-cols-3 gap-4">
      <div class="rounded-2xl overflow-hidden" v-for="char in characters" :key="char.id">
        <NuxtLink :to="`/character/${char.id}`">
          <img :src=char.image alt="Character picture">
        </NuxtLink>
      </div>
    </div>

  </section>
</template>


<script>
import axios from 'axios';

export default {
  name: 'EpisodePage',
  data() {
    return {
      episodeData: {},
      charactersLinks: [],
      charactersId: [],
      characters: [],
    };
  },
  mounted() {
    const episodeId = this.$route.params.id;
    console.log(episodeId);
    axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then(response => {
        this.episodeData = response.data;
        this.charactersLinks = response.data.characters;
        this.charactersLinks.forEach((link) => {
          this.charactersId.push(link.match(/\d+$/)[0]);
        })
      })
      .then(() => {
        const episodeCharacters = this.charactersId.join(',');
        axios.get(`https://rickandmortyapi.com/api/character/${episodeCharacters}`)
          .then((charactersData) => {
            console.log(charactersData.data);
            charactersData.data.forEach((char) => {
              this.characters.push(char);
            })
          })
          .catch((error) => { console.error(error) })
      })
      .catch(error => {
        console.error(error)
      });
  }

};
</script>