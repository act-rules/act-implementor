<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import DataLoader from "../components/DataLoader.vue";
import { useMainStore } from "../stores/useMain";

const router = useRouter();
const { loaded } = storeToRefs(useMainStore());

function redirect(action: string) {
  router.push(action === "new" ? "/implementation" : "/rules");
}
</script>

<template>
  <h1>Generate Implementation</h1>
  <p v-if="loaded">
    Content already loaded. Reloading replaces any unsaved results.
  </p>
  <DataLoader @loaded="redirect" />
</template>
