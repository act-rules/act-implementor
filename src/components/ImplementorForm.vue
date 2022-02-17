<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "../stores/useMain";

const store = useMainStore();
const implementation = storeToRefs(store).implementation;
</script>

<template>
  <form>
    <label>
      Project name
      <input v-model="implementation.projectName" />
    </label>
    <label>
      Short description
      <input v-model="implementation.shortdesc" />
    </label>
    <label>
      Description
      <textarea v-model="implementation.description" />
    </label>
    <label>
      Homepage URL
      <input
        v-model="implementation.homepage"
        type="url"
        placeholder="http://"
      />
    </label>
    <label>
      License URL
      <input
        v-model="implementation.license"
        type="url"
        placeholder="http://"
      />
    </label>
    <fieldset>
      <legend>Version used in testing</legend>
      <div class="field-group">
        <label>
          Number or name
          <input v-model="implementation.versionName" />
        </label>
        <label>
          Release date
          <input
            v-model="implementation.versionDate"
            placeholder="2022-01-01"
          />
        </label>
      </div>
    </fieldset>
  </form>
</template>
