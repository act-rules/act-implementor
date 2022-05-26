<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "../stores/useMain";
import ImplementationTable from "../components/ImplementationTable.vue";
import { RuleImplementation } from "../types";

let rule: RuleImplementation;
const ruleId = String(useRoute().params.ruleId);
const store = useMainStore();
const procedureName = ref(store.findProcedureName(ruleId));
const successCriteria = ref(store.findSuccessCriteria(ruleId));

try {
  rule = store.getRule(ruleId);
} catch (e) {
  console.error(e);
  useRouter().replace("/start");
}

function updateProcedure(e: Event) {
  const newValue = (e.target as HTMLInputElement).value;
  store.renameProcedure(ruleId, newValue);
  procedureName.value = newValue;
  // In rare cases, this may need updating;
  successCriteria.value = store.findSuccessCriteria(ruleId);
}

function updateSuccessCriteria(e: Event) {
  const newValue = (e.target as HTMLInputElement).value;
  store.setSuccessCriteria(ruleId, newValue);
  successCriteria.value = newValue;
}

function countText() {
  const { complete, total } = store.getRuleStats(ruleId, procedureName.value);
  return `${complete} of ${total} tests completed`;
}
</script>

<template>
  <h1>{{ rule.ruleName }} ({{ rule.ruleId }})</h1>
  <p>
    An Implementation procedure is a step, rule, or procedure in an testing
    methodology or automated testing tool. For details, see the
    <a :href="rule.rulePage" target="blank">rule page</a>.
  </p>

  <label>
    Implementation Procedure Name
    <input :value="procedureName" @change="updateProcedure" />
  </label>
  <label>
    WCAG 2 Success Criteria
    <input :value="successCriteria" @change="updateSuccessCriteria" />
  </label>
  <p>
    A comma separated list of success criteria numbers that fail when the
    procedure is failed. E.g. <code>1.1.1, 4.1.2</code>. Leave empty if the
    procedure does not fail WCAG 2 success criteria such as for best practices.
  </p>
  <ImplementationTable :rule-id="rule.ruleId" :procedure-name="procedureName" />
  <p v-text="countText()" />
  <p><router-link to="/rules">Back to rules list</router-link></p>
</template>
