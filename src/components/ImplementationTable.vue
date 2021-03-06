<script setup lang="ts">
import { useMainStore } from "../stores/useMain";
import { RuleImplementation } from "../types";
import { ref } from "vue";

const { getRule, getOutcome, setOutcome } = useMainStore();
const props = defineProps<{ ruleId: string; procedureName: string }>();
const rule = ref<RuleImplementation | null>(getRule(props.ruleId));

function selected(testCaseUrl: string, value: string): boolean {
  return getOutcome(props.procedureName, testCaseUrl) === value;
}

function changeOutcome(testCaseUrl: string, event: InputEvent) {
  const outcome = (event?.target as HTMLSelectElement).value || "untested";
  setOutcome(props.procedureName, testCaseUrl, outcome);
}

const results = {
  untested: "Untested",
  cantTell: "Cannot tell",
  passed: "Passed",
  failed: "Failed",
  inapplicable: "Inapplicable",
};
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Example Link</th>
        <th id="col-outcome">Outcome</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="testCase in rule?.testCases"
        :id="testCase.testcaseId"
        :key="testCase.url"
      >
        <th>
          <a :href="testCase.url" target="blank" title="Opens in a new window">
            {{ testCase.testcaseTitle }}
          </a>
        </th>
        <td>
          <select
            :aria-labelledby="`col-outcome ${testCase.testcaseId}`"
            @input="changeOutcome(testCase.url, $event as InputEvent)"
          >
            <option
              v-for="(text, value) of results"
              :key="value"
              :value="value"
              :selected="selected(testCase.url, value)"
              v-text="text"
            />
          </select>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
select {
  padding: 0.2em 0.5em;
  border: none;
  font-size: 0.9em;
  background: transparent;
}
</style>
