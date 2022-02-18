<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "../stores/useMain";

// TODO: Error handling on this

const { getEarlReport } = useMainStore();
const textarea = ref();
const reportText = ref("");
const error = ref("");
try {
  reportText.value = getEarlReport();
} catch (e) {
  error.value = "An error occurred generating the report";
  console.error(e);
}

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
  <p v-if="error" class="alert" v-text="error" />
  <template v-else>
    <label>
      JSON Results
      <textarea
        :ref="(el) => (textarea = el)"
        readonly
        rows="10"
        v-text="reportText"
      />
    </label>
    <button @click="copyTextarea">Copy to clipboard</button>
    <button disabled>Download file</button>
  </template>
</template>
