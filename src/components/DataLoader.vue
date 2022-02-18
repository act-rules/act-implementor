<script setup lang="ts">
import { ref } from "vue";
import { useMainStore } from "../stores/useMain";

const { localStorage } = window;
const { loadTestCases, loadReportText, resetReport } = useMainStore();
const statusText = ref("");
const reportText = ref("");
const inputType = ref(localStorage.getItem("inputType") ?? "new");
const reportUrl = ref(localStorage.getItem("reportUrl") ?? "https://");
const testcaseUrl = ref("https://act-rules.github.io/testcases.json");
const emit = defineEmits(["loaded"]);

function reportIssue(e: unknown, message: string) {
  console.error(e);
  statusText.value = message;
}

async function loadData() {
  let downloadedReport = "";
  localStorage.setItem("inputType", inputType.value);
  if (inputType.value === "url") {
    localStorage.setItem("reportUrl", reportUrl.value);
    try {
      const response = await fetch(reportUrl.value);
      downloadedReport = await response.text();
    } catch (e) {
      return reportIssue(e, `An error downloading the EARL report.`);
    }
  }

  if (inputType.value !== "new") {
    try {
      loadReportText(downloadedReport || reportText.value);
    } catch (e) {
      return reportIssue(e, `An error occurred processing the EARL report.`);
    }
  } else {
    resetReport();
  }

  try {
    await loadTestCases(testcaseUrl.value);
  } catch (e) {
    return reportIssue(e, `An error processing testcases.json.`);
  }
  emit("loaded", inputType.value);
}
</script>

<template>
  <p v-show="statusText !== ''" aria-live="polite">
    {{ statusText }}
  </p>
  <fieldset>
    <legend>Implementation Settings</legend>
    <label class="radio">
      <input v-model="inputType" value="new" type="radio" name="impl-type" />
      Create a new implementation
    </label>
    <label class="radio">
      <input v-model="inputType" value="text" type="radio" name="impl-type" />
      Include as text
    </label>
    <label class="radio">
      <input v-model="inputType" value="url" type="radio" name="impl-type" />
      Load from URL
    </label>
  </fieldset>

  <label v-show="inputType === 'text'">
    Implementation Report
    <textarea v-model="reportText" rows="6"></textarea>
  </label>
  <label v-show="inputType === 'url'">
    Implementation Report URL
    <input v-model="reportUrl" />
  </label>

  <details>
    <summary>Advanced Settings</summary>
    <label>
      URL to testcases.json
      <input v-model="testcaseUrl" />
    </label>
  </details>
  <button @click="loadData">Load Implementations</button>
</template>

<style scoped>
[aria-live] {
  padding: 0.75rem;
  background: var(--primary-end);
  border: solid 1px var(--primary-start);
}
</style>
