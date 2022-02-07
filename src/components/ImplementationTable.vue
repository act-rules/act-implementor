<script setup lang="ts">
import { useMainStore } from '../stores/useMain';
import { RuleImplementation } from '../logic/getImplementation';
import { defineProps, ref, toRefs } from "vue";

const { getRule } = useMainStore();
const props = defineProps({ ruleId: String });
const rule = ref<RuleImplementation | null>(null)
if (props.ruleId) {
  rule.value = getRule(props.ruleId) as RuleImplementation;
}
</script>

<template>
  <table>
      <tr>
        <th>Example Link</th>
        <th>SC 1.3.1</th>
        <th>SC 4.1.2</th>
      </tr>
      <tr v-for="testCase in rule?.testCases" :key="testCase.testcaseId">
        <th><a :href="testCase.url" target="blank">
          {{testCase.testcaseTitle}}
        </a></th>
        <td><select>
          <option>Untested</option>
          <option>Cannot Tell</option>
          <option>Passed</option>
          <option>Failed</option>
          <option>Inapplicable</option>
        </select></td>
        <td><select>
          <option>Untested</option>
          <option>Cannot Tell</option>
          <option>Passed</option>
          <option>Failed</option>
          <option>Inapplicable</option>
        </select></td>
      </tr>
    </table>
</template>

<style scoped>
  th, td {
    padding: .2em;
  }
</style>
