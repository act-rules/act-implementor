<template>
  <ul>
    <li><router-link to="/">Home</router-link></li>
    <li><router-link to="/start">Start</router-link></li>
    <li><router-link to="/generate">Overview</router-link></li>
    <li><router-link to="/export">Export</router-link></li>
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