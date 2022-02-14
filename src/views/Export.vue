<script setup lang="ts">
import { useMainStore } from '../stores/useMain';

const { getEarlReport } = useMainStore();
</script>

<template>
  <h1>Export Results</h1>
  <label>
    JSON Results
    <textarea v-text="getEarlReport()" readonly />
  </label>
  <button disabled>Copy to clipboard</button>
  <button disabled>Download file</button>
</template>

