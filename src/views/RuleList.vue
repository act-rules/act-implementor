<script setup lang="ts">
import RulesList from "../components/RulesList.vue";
import { useMainStore } from "../stores/useMain";

const mainStore = useMainStore();
const { complete, incomplete, untested } = mainStore.rulesOutcome;
</script>

<template>
  <h1>Generate Implementation</h1>
  <h2>Partially Tested Rules ({{ incomplete.length }})</h2>
  <p v-if="incomplete.length === 0"><em>There are no incomplete rules</em></p>
  <RulesList v-else :rule-ids="incomplete" />

  <h2>Fully Tested Rules ({{ complete.length }})</h2>
  <p v-if="complete.length === 0"><em>There are no completed rules</em></p>
  <RulesList v-else :rule-ids="complete" />

  <h2>Untested Rules ({{ untested.length }})</h2>
  <p v-if="untested.length === 0"><em>There are no untested rules</em></p>
  <RulesList v-else :rule-ids="untested" />
</template>
