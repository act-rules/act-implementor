<template>
  <ul>
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/how-to-use">How to use</router-link></li>
    <li><router-link to="/start">Start</router-link></li>
    <li><router-link to="/implementation">Implementation</router-link></li>
    <li><router-link to="/rules">Rules</router-link></li>
    <li><router-link to="/export">Export</router-link></li>
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
  padding: 0.5em 1em;
  display: inline-block;
}
a:hover,
a:focus {
  text-decoration: underline;
}
</style>
