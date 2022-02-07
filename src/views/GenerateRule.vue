<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { RuleImplementation } from '../types';
import { useMainStore } from '../stores/useMain';
import ImplementationTable from '../components/ImplementationTable.vue';

const { getRule } = useMainStore();
const ruleId = String(useRoute().params.ruleId);
const rule = getRule(ruleId) as RuleImplementation;
if (!rule) {
  useRouter().replace('/error');
}
</script>

<template>
  <h1>{{ rule.ruleName }} ({{rule.ruleId}})</h1>
  <p>Completed X out of Y test cases</p>
  <ImplementationTable :ruleId="rule.ruleId" />
</template>
