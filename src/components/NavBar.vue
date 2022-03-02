<script setup lang="ts">
import Icon from "./Icon.vue";
</script>

<template>
  <ul>
    <li>
      <router-link to="/"> <Icon type="house" />Home </router-link>
    </li>
    <li>
      <router-link to="/how-to-use">
        <Icon type="question-circle" />How to use
      </router-link>
    </li>
    <li>
      <router-link to="/start"> <Icon type="cloud-upload" />Start </router-link>
    </li>
    <li>
      <router-link to="/implementation">
        <Icon type="card-heading" />Implementation
      </router-link>
    </li>
    <li>
      <router-link
        to="/rules/"
        :class="{ active: $route.fullPath.includes('/rules/') }"
      >
        <Icon type="card-list" />Rules
      </router-link>
    </li>
    <li>
      <router-link to="/export">
        <Icon type="cloud-download" />Export
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
li {
  display: inline-block;
}
a {
  text-decoration: none;
  border-top: 3px solid transparent;
  padding: 0.25em 1em;
  display: inline-block;
}
a:hover,
a:focus {
  text-decoration: underline;
}
a.router-link-active,
a.active {
  border-top-color: var(--primary-start);
}
</style>
