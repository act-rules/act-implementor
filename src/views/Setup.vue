<script setup lang="ts">
import TestCaseLoader from '../components/TestCaseLoader.vue';
</script>

<template>
  <h1>Generator Setup</h1>
  <p>Text here...</p>
  <TestCaseLoader @loaded="$router.push('/rules')"/>
</template>