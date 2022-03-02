<script setup lang="ts">
import { ref } from "vue";
const props = defineProps<{
  type: string;
  small?: boolean;
}>();

const size = ref(1);
if (props.small) {
  size.value = 0.75;
}
</script>

<template>
  <i
    :class="['icon', `bi-${$props.type}`]"
    :style="{ fontSize: `${size}em` }"
  ></i>
</template>
