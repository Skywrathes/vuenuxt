<template class="bg-black">
  <Header></Header>
  <section class="flex flex-col items-center m-[4%]">
    <h1 class="text-[50px]">Characters</h1>
    <form class="flex gap-8 m-8 flex-col lg:flex-row w-full justify-between" v-on:submit.prevent="characterStore.filterCharacters">
      <input type="text" v-model="selectedName" class="border-blue-800 bg-gray-700 h-7 max-w-md rounded-md text-lg"
        placeholder="Find character">
      <div class="flex flex-col md:flex-row gap-4 text-lg">
        <div class="flex gap-5">
          <input type="radio" id="alive" value="alive" class="w-5 checked:scale-150 transition-transform"
            v-model="selectedStatus" @change="characterStore.filterCharacters" />
          <label for="alive">Alive</label>
        </div>

        <div class="flex gap-5">
          <input type="radio" id="dead" value="dead" class="w-5 checked:scale-150 transition-transform"
            v-model="selectedStatus" @change="characterStore.filterCharacters" />
          <label for="dead">Dead</label>
        </div>

        <div class="flex gap-5">
          <input type="radio" id="unknown" value="unknown" class="w-5 checked:scale-150 transition-transform"
            v-model="selectedStatus" @change="characterStore.filterCharacters" />
          <label for="unknown">Unknown</label>
        </div>


        <div class="flex gap-5">
          <input type="radio" id="all" value="all" class="w-5 checked:scale-150 transition-transform"
            v-model="selectedStatus" @change="characterStore.filterCharacters" />
          <label for="all">All</label>
        </div>
      </div>
      <!-- <button type="submit">Filter</button> -->
    </form>

    <nav class="flex justify-center gap-7 mb-5">
      <button class="text-xl font-bold" @click="characterStore.prevPage">Previous Page</button>
      <p class="text-xl">{{ page }}/{{ info.pages }}</p>
      <button class="text-xl font-bold" @click="characterStore.nextPage">Next Page</button>
    </nav>

    <div class="grid w-full gap-5 flex-col items-center md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      <Card />
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCharacterStore } from '~/store/character';
const characterStore = useCharacterStore();
const { characters, info, selectedStatus, selectedName, page } = storeToRefs(characterStore);

characterStore.filterCharacters();
onUpdated(() => {
  characterStore.filterCharacters();
})
</script>

<style>
body {
  background-color: rgb(45, 45, 45);
}

* {
  font-family: monospace;
  scroll-behavior: smooth;
  color: aliceblue;
}
</style>