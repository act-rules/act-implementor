<script setup lang="ts">
import NavBar from './NavBar.vue'
</script>

<template>  
  <header>
    <div><router-link to="/">
      ACT Implementation Generator
    </router-link>
    </div>
  </header>
  <nav><NavBar /></nav>
  <main>
    <slot />
  </main>
  <footer></footer>
</template>

<style scoped>
  header > div, footer, main, nav {
    margin: 0 auto;
    max-width: 800px;
  }
  header {
    background: var(--back-accent);
    border-bottom: solid 1px var(--primary);  
    padding: .5em 0 .3em;
    font-size: 1.5em;
    font-weight: 900;
  }
</style>
