<template>
  <p> {{compteur}} </p>
  <button v-on:click="compteur++"> {{nom + " " + prenom}} </button>
</template>

<script>
export default {
  name: 'CompteurDeTruc',
  data: function() {
    return {
      compteur: 0
    }
  },
  props: {
    nom: String,
    prenom: String
  }
}
</script>
