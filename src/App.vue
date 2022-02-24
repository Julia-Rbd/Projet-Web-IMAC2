<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <CompteurDeTruc v-for="(el, index) in liste" :key="index" :nom="el"/>
</template>

<script>
import CompteurDeTruc from './components/CompteurDeTruc.vue'

export default {
  name: 'App',
  data: function(){
    return {
        liste : ['el1', 'el2', 'el3']
    }
  },
  components: {
    CompteurDeTruc
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
  margin-top: 60px;
}
</style>
