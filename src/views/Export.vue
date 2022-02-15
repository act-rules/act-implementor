<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "../stores/useMain";

const { getEarlReport } = useMainStore();
const textarea = ref();

function copyTextarea() {
  if (textarea.value instanceof HTMLTextAreaElement) {
    textarea.value.select();
    textarea.value.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textarea.value.value);
  }
}
</script>

<template>
  <h1>Export Results</h1>
  <label>
    JSON Results
    <textarea
      :ref="(el) => (textarea = el)"
      readonly
      v-text="getEarlReport()"
    />
  </label>
  <button @click="copyTextarea">Copy to clipboard</button>
  <button disabled>Download file</button>
</template>
