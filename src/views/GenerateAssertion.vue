<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMainStore } from '../stores/useMain';
import ImplementationTable from '../components/ImplementationTable.vue';

const { getRule, renameProcedure, findProcedureName } = useMainStore();
const ruleId = String(useRoute().params.ruleId);
const procedureName = ref(findProcedureName(ruleId));
const rule = getRule(ruleId);

function updateProcedure(e: Event) {
  const currentValue = procedureName.value;
  const newValue = (e.target as HTMLInputElement).value;
  renameProcedure(currentValue, newValue);
  procedureName.value = newValue;
}
</script>

<template>
  <h1>{{ rule.ruleName }} ({{rule.ruleId}})</h1>
  <label>
    Implementation Procedure
    <input :value="procedureName" @input="updateProcedure" />
  </label>
  <p>Enter a name or identifier for the procedure, rule, or step in the test methodology.</p>
  <ImplementationTable :ruleId="rule.ruleId" :procedureName="procedureName" />
  <p><router-link to="/generate/">Back to rules list</router-link></p>
</template>
