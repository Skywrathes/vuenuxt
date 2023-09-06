<template class="bg-black">
    <h1>Lines {{ info.count }}</h1>
    <h1>Pages {{ info.pages }}</h1>
    <form v-on:submit.prevent="formSubmit">
      <input type="text" v-model="nameInput"
    class="border-black border-2 rounded-md" placeholder="Find character">
      <button type="submit">Filter</button>
    </form>
    
    <div class="flex gap-5 flex-col items-center">
      <div class="p-4 border-purple-900 bg-gray-400 rounded-md border-2 flex flex-col justify-center items-center"
        v-for="item in characters" :key="item.id">
        <p>Key: {{ item.id }}</p>
        <NuxtLink to="/character">Name: {{ item.name }}</NuxtLink>
        <img class="w-1/3 rounded-md" :src=item.image>
        <p>Status: {{ item.status }}</p>
        <p id="posts" v-for="episode in item.episode.slice(0, 5)">Episodes: {{ episode }}</p>
      </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Character, Info } from '~/types';
import { useCharacterStore } from '~/store/character';

const characterStore = useCharacterStore();
const { characters, info } = storeToRefs(characterStore);


characterStore.getCharacters();
let nameInput = '';

// export type Response = {
//   info: { count: string; pages: string; next: string; prev: string };
//   results: Array<Character>;
// };

// function inputChange(event: FormDataEvent) {
//   this.nameInput = event.target.value
// }
// const info = (data.value as any).info;
// const results: Character[] = (data.value as any).results;

function formSubmit() {
  characterStore.filterCharacters(nameInput)
}
</script>

<style>
.cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  border: 1px solid black;
  padding: 5px;
  border-radius: 8px;
}
</style>