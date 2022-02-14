<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useMainStore } from '../stores/useMain';

const mainStore = useMainStore()
const { rules } = storeToRefs(mainStore);

function progressCount(ruleId: string): string {
  const { complete, total } = mainStore.getRuleStats(ruleId);
  return `${complete} / ${total}`
}
</script>

<template>
  <ol>
    <li v-for="{ ruleId, ruleName } of rules" :key="ruleId">
      <router-link :to="`/generate/${ruleId}`">
        <span v-text="ruleName" class="text" />
        <span v-text="progressCount(ruleId)" />
      </router-link>
    </li>
  </ol>
</template>

<style scoped>
a {
  padding: .25em .5em .25em .25em;
  display: flex;
  justify-content: space-between;
  text-decoration: none;
}
a > .text {
  text-decoration: underline;
}
li:hover, li:focus-within {
  background-color: var(--base-preEnd);
}
</style>
