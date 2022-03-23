<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!--<CompteurDeTruc v-for="(el, index) in liste" :key="index" :nom="el"/>-->
  <div id="colonnes">
    <ColonneReddit
      v-for="(el, index) in liste"
      :key="el"
      :nom="el"
      :cle="index"
      v-on:CloseColonne="closedColonne"
    />
    <form onsubmit="return false">
      <input v-model="this.titre_nouvelle_colonne" />
      <button @click="addColonne()"> Nouvelle colonne </button>
    </form>
  </div>
</template>

<script>
//import CompteurDeTruc from './components/CompteurDeTruc.vue'
import ColonneReddit from './components/ColonneReddit.vue'

export default {
  name: 'App',
  data: function(){
    return {
        liste : ['colonne1', 'colonne2', 'colonne3', 'colonne4'],
        titre_nouvelle_colonne : ""
    }
  },
  methods: {
    closedColonne(cle){
      console.log("colonne " + cle + " fermée")
      this.liste.splice(cle,1)
    },
    addColonne(){
      console.log("colonne " + this.titre_nouvelle_colonne + " ouverte")
      this.liste.push(this.titre_nouvelle_colonne)
      this.titre_nouvelle_colonne = ""
    }
  },
  components: {
    //CompteurDeTruc,
    ColonneReddit
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
  #colonnes {
    display: flex;
    flex-direction: row;
  }
</style>
