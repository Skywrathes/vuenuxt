<!-- eslint-disable vue/multi-word-component-names -->
<template class="bg-black">
  <Header />
  <section class="flex flex-col items-center justify-center m-[4%]">
    <h1 class="text-[50px]">Characters</h1>
    <form
      class="flex gap-8 m-8 flex-col lg:flex-row w-full justify-between"
      @submit.prevent="characterStore.filterCharacters"
    >
      <div class="max-w-md flex gap-5">
        <input
          v-model="selectedName"
          type="text"
          class="border-blue-800 bg-gray-700 h-7 rounded-md text-lg"
          placeholder="Find character"
        />
        <p v-if="notFound" class="self-start text-red-600 text-lg">Not found</p>
      </div>
      <div class="flex flex-col md:flex-row gap-4 text-lg">
        <div class="flex gap-5">
          <input
            id="alive"
            v-model="selectedStatus"
            type="radio"
            value="alive"
            class="w-5 checked:scale-150 transition-transform"
            @change="characterStore.filterCharacters"
          />
          <label for="alive">Alive</label>
        </div>

        <div class="flex gap-5">
          <input
            id="dead"
            v-model="selectedStatus"
            type="radio"
            value="dead"
            class="w-5 checked:scale-150 transition-transform"
            @change="characterStore.filterCharacters"
          />
          <label for="dead">Dead</label>
        </div>

        <div class="flex gap-5">
          <input
            id="unknown"
            v-model="selectedStatus"
            type="radio"
            value="unknown"
            class="w-5 checked:scale-150 transition-transform"
            @change="characterStore.filterCharacters"
          />
          <label for="unknown">Unknown</label>
        </div>

        <div class="flex gap-5">
          <input
            id="all"
            v-model="selectedStatus"
            type="radio"
            value="all"
            class="w-5 checked:scale-150 transition-transform"
            @change="characterStore.filterCharacters"
          />
          <label for="all">All</label>
        </div>
      </div>
    </form>

    <nav class="flex justify-center gap-7 mb-5">
      <button
        class="text-xl font-bold hover:text-purple-400 transition-colors"
        @click="characterStore.prevPage"
      >
        Previous Page
      </button>
      <p class="text-xl">{{ page }}/{{ info.pages }}</p>
      <button
        class="text-xl font-bold hover:text-purple-400 transition-colors"
        @click="characterStore.nextPage"
      >
        Next Page
      </button>
    </nav>

    <div
      class="grid w-full gap-5 flex-col items-center md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
    >
      <Card />
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCharacterStore } from "~/store/character";
const characterStore = useCharacterStore();
const { info, selectedStatus, selectedName, page, notFound } =
  storeToRefs(characterStore);

// eslint-disable-next-line no-undef
onMounted(() => {
  characterStore.filterCharacters();
});

// eslint-disable-next-line no-undef
onUpdated(() => {
  characterStore.filterCharacters();
});
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
