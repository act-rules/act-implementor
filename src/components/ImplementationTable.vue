<script setup lang="ts">
import { useMainStore } from '../stores/useMain';
import { RuleImplementation } from '../types';
import { defineProps, ref } from "vue";

const { getRule } = useMainStore();
const props = defineProps({ ruleId: String });
const rule = ref<RuleImplementation | null>(null)
if (props.ruleId) {
  rule.value = getRule(props.ruleId) as RuleImplementation;
}

function requirementTexts(
  rule: RuleImplementation | null
): Record<string, string> {
  if (!rule?.ruleAccessibilityRequirements) {
    return { bestpractice: 'ACT Best practice' }
  }
  const requirements =  Object.keys(rule.ruleAccessibilityRequirements);
  const entries = requirements.map(key => {
    const text = key.replace(/[:-_]/g, ' ')
      .replace('wcag', 'WCAG')
      .replace('aria', 'ARIA')
    return [key, text]
  })
  return Object.fromEntries(entries)
}
</script>

<template>
  <div hidden id="outcome">Outcome for</div>
  <table>
    <thead>
      <tr>
        <th>Example Link</th>
        <th v-for="text, key in requirementTexts(rule)" :id="key">
          {{ text }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="testCase in rule?.testCases" :id="testCase.testcaseId">
        <th><a :href="testCase.url" target="blank" title="Opens in a new window">
          {{testCase.testcaseTitle}}
        </a></th>
        <td v-for="text, key in requirementTexts(rule)">
          <select :aria-labelledby="`outcome ${testCase.testcaseId} ${key}`">
            <option>Untested</option>
            <option>Cannot Tell</option>
            <option>Passed</option>
            <option>Failed</option>
            <option>Inapplicable</option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
</template>
