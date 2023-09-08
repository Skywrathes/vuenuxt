<template>
  <div class="h-full p-3 border-l-yellow-100 bg-cyan-100 rounded-md border-2 flex flex-col justify-start items-center"
    v-for="item in characters" :key="item.id">
    <p>Key: {{ item.id }}</p>
    <NuxtLink class="text-2xl hover:text-purple-500 mb-3" to="/character">Name: {{ item.name }}</NuxtLink>
    <img class="w-1/3 rounded-md" :src=item.image>
    <p>{{ item.status }} - {{ item.species }}</p>
    <h3 id="posts" class="text-2xl">Episodes:</h3>
    <ul class="flex gap-3 text-2xl">
      <li class="text-pink-100 bg-gradient-to-r from-purple-500 to-pink-500 
        min-w-[35px] rounded-lg border-pink-400 text-center" v-for="episode in item.episode.slice(0, 5)">
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