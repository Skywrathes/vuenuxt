<template class="bg-black">
  <h1>Lines {{ info.count }}</h1>
  <h1>Pages {{ info.pages }}</h1>
  <form v-on:submit.prevent="formSubmit">
    <input type="text" v-model="nameInput" class="border-black border-2 rounded-md" placeholder="Find character">
    <button type="submit">Filter</button>
  </form>
  <hr />
  <div class="flex gap-2">
    <input type="radio" id="alive" value="alive" 
    v-model="selectedOption" @change="(e) => handleStatusChange(e)" />
    <label for="option1">Alive</label>

    <input type="radio" id="dead" value="dead" 
    v-model="selectedOption" @change="(e) => handleStatusChange(e)" />
    <label for="option2">Dead</label>

    <input type="radio" id="unknown" value="unknown" 
    v-model="selectedOption" @change="(e) => handleStatusChange(e)" />
    <label for="option3">Unknown</label>
  </div>

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
import { useCharacterStore } from '~/store/character';

const characterStore = useCharacterStore();
const { characters, info } = storeToRefs(characterStore);


characterStore.getCharacters();
let nameInput = '';
let selectedOption = '';

function handleStatusChange (e: any) {
  selectedOption = e.target.value;
  characterStore.filterCharacters(nameInput, selectedOption)
}

function formSubmit() {
  characterStore.filterCharacters(nameInput, selectedOption)
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