<template>  
  <header><div>
    ACT Implementation Generator
  </div></header>
  <main>
    <slot />
  </main>
  <footer></footer>
</template>

<style scoped>
  header > div, footer, main {
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
