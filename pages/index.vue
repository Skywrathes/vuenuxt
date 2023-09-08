<template class="bg-black">
  <h1>Lines {{ info.count }}</h1>
  <h1>Pages {{ info.pages }}</h1>
  <form v-on:submit.prevent="characterStore.filterCharacters">
    <input type="text" v-model="selectedName"
    class="border-black border-2 rounded-md" placeholder="Find character">
    <button type="submit">Filter</button>
  </form>
  <hr />
  <div class="flex gap-2">
    <input type="radio" id="alive" value="alive" 
    v-model="selectedStatus" @change="characterStore.filterCharacters" />
    <label for="alive">Alive</label>

    <input type="radio" id="dead" value="dead" 
    v-model="selectedStatus" @change="characterStore.filterCharacters" />
    <label for="dead">Dead</label>

    <input type="radio" id="unknown" value="unknown" 
    v-model="selectedStatus" @change="characterStore.filterCharacters" />
    <label for="unknown">Unknown</label>

    <input type="radio" id="all" value="all"
    v-model="selectedStatus" @change="characterStore.filterCharacters" />
    <label for="all">All</label>
  </div>
  <hr/>

  <nav class="flex justify-center gap-7">
    <button class="text-xl font-bold" @click="characterStore.prevPage">Previous Page</button>
    <p class="text-xl">{{ page }}/{{ info.pages }}</p>
    <button class="text-xl font-bold" @click="characterStore.nextPage">Next Page</button>
  </nav>

  <div class="grid gap-5 flex-col items-center xl:grid-cols-2 2xl:grid-cols-3 m-[3%]">
    <Card/>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '~/store/character';
const characterStore = useCharacterStore();
const { characters, info, selectedStatus, selectedName, page } = storeToRefs(characterStore);

characterStore.getCharacters();
onBeforeUpdate(()=> {
  characterStore.filterCharacters();
})
// setTimeout(()=> {
//   characterStore.filterCharacters();
// }, 0)
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