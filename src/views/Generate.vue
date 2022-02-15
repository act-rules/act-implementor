<script setup lang="ts">
import { storeToRefs } from "pinia";
import DataLoader from "../components/DataLoader.vue";
import RulesList from "../components/RulesList.vue";
import { useMainStore } from "../stores/useMain";

const store = useMainStore();
const { loaded } = storeToRefs(store);
</script>

<template>
  <h1>Generate Implementation</h1>
  <DataLoader v-if="!loaded" />
  <RulesList v-else />
</template>
