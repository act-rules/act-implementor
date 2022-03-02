<script setup lang="ts">
import NavBar from "./NavBar.vue";
import { ref } from "vue";
const main = ref();
function skipToContent(e: Event) {
  if (main.value instanceof HTMLElement) {
    e.preventDefault();
    main.value.focus();
    return false;
  }
}
</script>

<template>
  <div id="layout">
    <div class="skiplink">
      <a href="#main" @click="skipToContent"> Skip to main content </a>
    </div>
    <header>
      <div><router-link to="/">ACT Implementation Generator</router-link></div>
    </header>
    <nav><NavBar /></nav>
    <main id="main" :ref="(el) => (main = el)" tabindex="-1">
      <slot />
    </main>
    <footer>
      <p>
        This tool is maintained by the
        <a href="https://act-rules.github.io/" target="_blank"
          >ACT Rules Community Group</a
        >. Source code and issues can be viewed on
        <a href="https://github.com/act-rules/act-implementor/" target="_blank"
          >GitHub</a
        >.
      </p>
    </footer>
  </div>
</template>

<style scoped>
#layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.skiplink > a {
  position: absolute;
  top: -2em;
}
.skiplink > a:focus {
  top: 0;
}
header > div,
footer > p,
main,
.skiplink,
nav {
  box-sizing: border-box;
  margin: 0 auto;
  width: min(calc(100vw - 16px), 830px);
  /* max-width: 830px; */
  padding: 0 1rem;
}
header {
  background: var(--base-preEnd);
  border-bottom: solid 1px var(--primary-start);
  padding-top: 0.5em;
  font-size: 1.5em;
  font-weight: 900;
}
footer a,
header a {
  color: var(--text);
}
header a {
  padding: 0.5em 1em 0.3em 0;
  text-decoration: none;
  display: inline-block;
}
header a:hover,
header a:focus {
  text-decoration: underline;
}

main {
  flex-grow: 1;
  /* Prevent visible focus indicator */
  box-shadow: none;
  outline: none;
}

footer {
  font-size: 0.9em;
  margin-top: 1rem;
  border-top: solid 1px var(--base-mid);
  padding: 1em 0;
}
</style>
