<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMainStore } from '../stores/useMain';

const main = useMainStore()
const { rules } = storeToRefs(main);
</script>

<template>
  <ol>
    <li v-for="{ ruleId, ruleName } in rules" :key="ruleId">
      <router-link :to="`/generate/${ruleId}`">
        {{ ruleName }}
      </router-link>
    </li>
  </ol>
</template>

<style scoped>
</style>
