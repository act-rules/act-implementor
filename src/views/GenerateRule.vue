<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMainStore } from '../stores/useMain';

const store = useMainStore();
const { loaded } = storeToRefs(store);
</script>

<template>
  <h1>Generate Rule</h1>
</template>