<script setup lang="ts">
import { storeToRefs } from 'pinia';
import DataLoader from '../components/DataLoader.vue';
import { useMainStore } from '../stores/useMain';

const store = useMainStore();
const { loaded } = storeToRefs(store);
</script>

<template>
  <h1>Generate Implementation</h1>
  <p v-if="loaded">
    Content already loaded. Reloading replaces any unsaved results.
  </p>
  <DataLoader @loaded="$router.replace('/generate')" />
</template>