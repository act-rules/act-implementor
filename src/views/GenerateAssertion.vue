<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "../stores/useMain";
import ImplementationTable from "../components/ImplementationTable.vue";
import { AccessibilityRequirement, RuleImplementation } from "../types";

let rule: RuleImplementation;
const { getRule, renameProcedure, findProcedureName, getRuleStats } =
  useMainStore();
const ruleId = String(useRoute().params.ruleId);
const procedureName = ref(findProcedureName(ruleId));
try {
  rule = getRule(ruleId);
} catch (e) {
  console.error(e);
  useRouter().replace("/start");
}

function updateProcedure(e: Event) {
  const currentValue = procedureName.value;
  const newValue = (e.target as HTMLInputElement).value;
  renameProcedure(currentValue, newValue);
  procedureName.value = newValue;
}

function requirementName(
  id: string,
  requirement: AccessibilityRequirement
): string {
  return requirement.title || id;
}

function countText() {
  const { complete, total } = getRuleStats(ruleId, procedureName.value);
  return `${complete} of ${total} tests completed`;
}
</script>

<template>
  <h1>{{ rule.ruleName }} ({{ rule.ruleId }})</h1>
  <p>
    An Implementation procedure is a step, rule, or procedure in an testing
    methodology or automated testing tool. This procedure must test for the
    accessibility requirements. For details, see the
    <a :href="rule.rulePage" target="blank">rule page</a>.
  </p>
  <ul v-if="rule.ruleAccessibilityRequirements">
    <li
      v-for="(requirement, key) in rule.ruleAccessibilityRequirements"
      :key="key"
    >
      {{ requirementName(key, requirement) }}
    </li>
  </ul>
  <p v-else><em>This rule has no accessibility requirements.</em></p>
  <label>
    Implementation Procedure
    <input :value="procedureName" @change="updateProcedure" />
  </label>
  <ImplementationTable :rule-id="rule.ruleId" :procedure-name="procedureName" />
  <p v-text="countText()" />
  <p><router-link to="/generate/">Back to rules list</router-link></p>
</template>
