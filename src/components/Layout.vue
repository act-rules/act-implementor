<script setup lang="ts">
import NavBar from "./NavBar.vue";
</script>

<template>
  <header>
    <div><router-link to="/"> ACT Implementation Generator </router-link></div>
  </header>
  <nav><NavBar /></nav>
  <main>
    <slot />
  </main>
  <footer></footer>
</template>

<style scoped>
header > div,
footer,
main,
nav {
  margin: 0 auto;
  max-width: 830px;
  padding: 0 1rem;
}
header {
  background: var(--base-preEnd);
  border-bottom: solid 1px var(--primary-start);
  font-size: 1.5em;
  font-weight: 900;
}
header a {
  padding: 0.5em 1em 0.3em 0;
  color: var(--text);
  text-decoration: none;
  display: inline-block;
}
header a:hover,
header a:focus {
  text-decoration: underline;
}
</style>
