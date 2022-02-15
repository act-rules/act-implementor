<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useMainStore } from "../stores/useMain";

const { loadTestCases, loadReportText, resetReport } = useMainStore();
const statusText = ref("");
const reportText = ref("");
const reportUrl = ref("https://");
const inputType = ref("blank");
const testcaseUrl = ref("https://act-rules.github.io/testcases.json");
const emit = defineEmits(["loaded"]);

function reportIssue(e: any, message: string) {
  console.error(e);
  statusText.value = `An error occurred processing the EARL report.`;
}

async function loadData() {
  let downloadedReport = "";
  if (inputType.value === "url") {
    try {
      const response = await fetch(reportUrl.value);
      downloadedReport = await response.text();
    } catch (e) {
      return reportIssue(e, `An error downloading the EARL report.`);
    }
  }

  if (inputType.value !== "blank") {
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
  emit("loaded");
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
      <input value="text" v-model="inputType" type="radio" name="impl-type" />
      Include as text
    </label>
    <label class="radio">
      <input value="url" v-model="inputType" type="radio" name="impl-type" />
      Load from URL
    </label>
  </fieldset>

  <label v-show="inputType === 'text'">
    Implementation Report
    <textarea rows="6" v-model="reportText"></textarea>
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
