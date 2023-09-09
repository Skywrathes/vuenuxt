<template>
  <Header></Header>
  <section class="flex flex-col m-[4%] items-center">
    <h1 class="text-3xl md:text-[35px] lg:text-[55px] mb-5 lg:mb-10">
      {{ characterData.name }}
    </h1>
    <h2 class="text-lg md:text-[25px] lg:text-[35px] mb-6">
      {{ characterData.species }}
    </h2>
    <img
      class="rounded-2xl mb-4"
      :src="characterData.image"
      alt="Character picture"
    />
    <p class="text-md md:text-[20px] lg:text-[30px]">
      Location: {{ location.name }}
    </p>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "EpisodePage",
  data() {
    return {
      characterData: {},
      location: [],
    };
  },
  mounted() {
    const characterId = this.$route.params.id;
    axios
      .get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((response) => {
        this.characterData = response.data;
        this.location = response.data.location;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
