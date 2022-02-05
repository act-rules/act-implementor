<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Layout from './components/Layout.vue'
import TestCaseLoader from './components/TestCaseLoader.vue'
import RulesList from './components/RulesList.vue'

import { useMainStore } from './stores/useMain';
const { loaded } = storeToRefs(useMainStore())
</script>

<template>
<Layout>
  <TestCaseLoader v-if="!loaded" />
  <RulesList v-else />
</Layout>
</template>

