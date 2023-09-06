<template>
  <client-only>
    <h1>Hello {{characterName}}!</h1>
    <button @click="changeName()">FFFFF</button>
  </client-only>
</template>


<script setup>
  import { storeToRefs } from 'pinia';
  import { useCharacterStore } from '~/store/character';
  const store = useCharacterStore();
  const { characterName } = storeToRefs(store);
  console.log(characterName);
  function changeName() {
    store.changeName();
    console.log(characterName);
  }
</script>