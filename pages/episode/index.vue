<template>
  <h1>Hello +{{episodeId}}!</h1>
  <h2>{{episodeData.name}}</h2>
</template>


<script>
import axios from 'axios';

export default {
  name: 'EpisodePage',
  data() {
    return {
      episodeData: null,
    };
  },
  mounted() {
    const episodeId = this.$route.params.id;
    console.log(episodeId);
    axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`)
      .then(response => {
        this.episodeData = response.data;
        console.log(this.episodeData);
      })
      .catch(error => {
        console.error(error)
      });
  }
};
</script>