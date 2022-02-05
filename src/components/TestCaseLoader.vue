<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { useMainStore } from '../stores/useMain';

const main = useMainStore();
const statusText = ref('');
const testcaseUrl = ref('https://act-rules.github.io/testcases.json');
const emit = defineEmits<{ (e: 'loaded', value: undefined): void }>()

async function loadData() {
  statusText.value = 'Loading... please wait';
  await main.loadTestCases(testcaseUrl.value);
  emit('loaded', undefined);
}
</script>

<template>
  <p aria-live="polite" v-show="statusText !== ''">
    {{ statusText }}
  </p>
  <label>
    URL to testcases.json
    <input v-model="testcaseUrl">
  </label>
  <label hidden>
    Existing implementation file (optional)
    <input>
  </label>
  <button @click="loadData">
    Load Implementations
  </button>
</template>

<style scoped>
  [aria-live] {
    padding: .8rem;
    background: var(--primary-back);
    border: solid 1px var(--primary);
  }
</style>
