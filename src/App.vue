<template>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 1900px;
  margin: auto;
}
table {
  background: white;
  color: white;
  border-spacing: 1px;
}
td{
  color: black;
  border-top: 1px solid #6821dc;
}
th{
  background: #6821dc;
}

td, th {
  text-align: center;
}
a {
  text-decoration: none;
  color: #3c5684;
  font-size: 18px;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
