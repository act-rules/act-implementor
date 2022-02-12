<script setup lang="ts">
import { useMainStore } from '../stores/useMain';
import { RuleImplementation } from '../types';
import { defineProps, ref } from "vue";

const { getRule, getOutcome, setOutcome } = useMainStore();
const props = defineProps<{ ruleId: string, procedureName: string }>()
const rule = ref<RuleImplementation | null>(
  getRule(props.ruleId)
)

function selected(testCaseId: string, value: string): boolean {
  return getOutcome(props.procedureName, testCaseId) === value;
}

function changeOutcome(testCaseId: string, event: InputEvent) {
  const outcome = (event?.target as HTMLSelectElement).value || 'untested';
  setOutcome(props.procedureName, testCaseId, outcome);
}

const results = {
  untested: 'Untested',
  cantTell: 'Cannot tell',
  passed: 'Passed',
  failed: 'Failed',
  inapplicable: 'Inapplicable',
}
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
      <tr v-for="testCase in rule?.testCases" :id="testCase.testcaseId">
        <th><a :href="testCase.url" target="blank" title="Opens in a new window">
          {{testCase.testcaseTitle}}
        </a></th>
        <td>
          <select
            :aria-labelledby="`col-outcome ${testCase.testcaseId}`"
            @input="changeOutcome(testCase.testcaseId, $event as InputEvent)"
          >
            <option 
              v-for="text, value of results"
              :value="value"
              :selected="selected(testCase.testcaseId, value)"
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
    padding: .2em .5em;
    border: none;
    font-size: .9em;
    background: transparent;
  }
</style>