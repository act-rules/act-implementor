<template>
  <ul>
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/about">About</router-link></li>
    <li><router-link to="/generate">Generate</router-link></li>
  </ul>
</template>

<style scoped>
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    padding: .5em 1em;
    display: inline-block;
  }
  a:hover, a:focus {
    text-decoration: underline;
  }
</style>