<template>
  <div id="app">
    <Digitz />
  </div>
</template>

<script>
import Digitz from './components/Digitz';

export default {
  name: 'Start',
  components: {
    Digitz
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 2rem;
}
</style>
