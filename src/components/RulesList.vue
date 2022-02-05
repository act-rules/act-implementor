<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMainStore } from '../stores/useMain';

const main = useMainStore()
const { rules } = storeToRefs(main);
</script>

<template>
  <h1>ACT Rules</h1>
  <ul>
    <li v-for="{ ruleId, ruleName } in rules" :key="ruleId">
      {{ ruleName }}
    </li>
  </ul>
</template>

<style scoped>
</style>
