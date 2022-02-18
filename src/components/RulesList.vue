<script setup lang="ts">
import { useMainStore } from "../stores/useMain";

const mainStore = useMainStore();
const props = defineProps<{ ruleIds: string[] }>();

const filteredRules: typeof mainStore["rules"] = {};
if (mainStore.rules) {
  Object.entries(mainStore.rules).forEach(([ruleId, ruleData]) => {
    if (props.ruleIds.includes(ruleId)) {
      filteredRules[ruleId] = ruleData;
    }
  });
}

function progressCount(ruleId: string): string {
  const { complete, total } = mainStore.getRuleStats(ruleId);
  return `${complete} / ${total}`;
}
</script>

<template>
  <ol>
    <li v-for="{ ruleId, ruleName } of filteredRules" :key="ruleId">
      <router-link :to="`/rules/${ruleId}`">
        <span class="text" v-text="ruleName" />
        <span v-text="progressCount(ruleId)" />
      </router-link>
    </li>
  </ol>
</template>

<style scoped>
a {
  padding: 0.25em 0.5em 0.25em 0.25em;
  display: flex;
  justify-content: space-between;
  text-decoration: none;
}
a > .text {
  text-decoration: underline;
}
li:hover,
li:focus-within {
  background-color: var(--base-preEnd);
}
</style>
