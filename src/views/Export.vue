<script setup lang="ts">
import Icon from "../components/Icon.vue";
import { ref } from "vue";
import { useMainStore } from "../stores/useMain";

const store = useMainStore();
const textarea = ref();
const reportText = ref("");
const error = ref("");
try {
  reportText.value = store.getEarlReport();
} catch (e) {
  error.value = "An error occurred generating the report";
  console.error(e);
}

function copyTextarea() {
  if (textarea.value instanceof HTMLTextAreaElement) {
    textarea.value.select();
    textarea.value.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textarea.value.value);
    store.setUnsaved(false);
  }
}

function downloadFile() {
  const blobConfig = new Blob([reportText.value], {
    type: "text/json;charset=utf-8",
  });
  const blobUrl = URL.createObjectURL(blobConfig);
  const anchor = document.createElement("a");
  anchor.href = blobUrl;
  anchor.target = "_blank";
  anchor.download = store.reportFileName;
  anchor.click();
  // This is required
  URL.revokeObjectURL(blobUrl);
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
    <button @click="copyTextarea">
      <Icon type="clipboard-plus" /> Copy to clipboard
    </button>
    <button @click="downloadFile">
      <Icon type="file-earmark-arrow-down" /> Download file
    </button>
  </template>
</template>
