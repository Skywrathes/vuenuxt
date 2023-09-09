<template>
  <div class="h-full p-[5%] bg-gradient-to-br to-gray-950 from-cyan-900 rounded-lg flex flex-col justify-start items-center"
    v-for="item in characters" :key="item.id">
    <NuxtLink class="text-2xl text-center hover:scale-110 transition-all mb-3" :to="`/character/${item.id}`">Name: {{ item.name }}</NuxtLink>
    <img class="w-1/3 rounded-md mb-2" :src=item.image alt="Character picture">
    <p>{{ item.status }} - {{ item.species }}</p>
    <h3 id="posts" class="text-2xl">Episodes:</h3>
    <ul class="flex gap-3 text-2xl">
      <li class="text-pink-100 hover:scale-110 transition-transform
        min-w-[35px] rounded-lg text-center" v-for="episode in item.episode.slice(0, 5)">
        <NuxtLink :to="`/episode/${episode.match(/\d+$/)[0]}`">{{ episode.match(/\d+$/)[0] }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '~/store/character';
const characterStore = useCharacterStore();
const { characters } = storeToRefs(characterStore);

</script>