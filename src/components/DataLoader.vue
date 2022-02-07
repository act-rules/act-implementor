<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { useMainStore } from '../stores/useMain';

const main = useMainStore();
const statusText = ref('');
const reportText = ref('');
const reportUrl = ref('https://');
const inputType = ref('blank');
const testcaseUrl = ref('https://act-rules.github.io/testcases.json');
const emit = defineEmits(['loaded']);

async function loadData() {
  statusText.value = 'Loading... please wait';
  await main.loadTestCases(testcaseUrl.value);
  emit('loaded');
}
</script>

<template>
  <p aria-live="polite" v-show="statusText !== ''">
    {{ statusText }}
  </p>
  <fieldset>
    <legend>Implementation Settings</legend>
    <label class="radio">
      <input value="blank" v-model="inputType" type="radio" name="impl-type" />
      Create a new implementation
    </label>
    <label class="radio">
      <input value="text" v-model="inputType" type="radio" name="impl-type" disabled />
      Include as text
    </label>
    <label class="radio">
      <input value="url" v-model="inputType" type="radio" name="impl-type" disabled />
      Load from URL
    </label>
  </fieldset>

  <label v-show="inputType === 'text'">
    Implementation Report
    <textarea rows="6" v-model="reportText"></textarea>
  </label>
  <label v-show="inputType === 'url'">
    Implementation Report URL
    <input v-model="reportUrl">
  </label>

  <details>
    <summary>Advanced Settings</summary>
    <label>
      URL to testcases.json
      <input v-model="testcaseUrl">
    </label>
  </details>
  <button @click="loadData">
    Load Implementations
  </button>
</template>

<style scoped>
  [aria-live] {
    padding: .75rem;
    background: var(--primary-end);
    border: solid 1px var(--primary-start);
  }
</style>
