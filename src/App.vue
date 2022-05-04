<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div id="colonnes">
    <ColonneReddit
      v-for="(el, index) in liste"
      :key="el"
      :nom="el"
      :cle="index"
      v-on:CloseColonne="closedColonne"
      :api="reddit"
    />
    <SubResearch
      :api="reddit"
      v-on:SubredditSelection="addColonne"
    />
  </div>
</template>

<script>
import ColonneReddit from './components/ColonneReddit.vue'
import { Reddit } from '@/Reddit.js'
import SubResearch from './components/SubResearch.vue'

export default {
  name: 'App',
  data: function(){
    return {
        liste : [],
        reddit : new Reddit(this.redditReady.bind(this))
    }
  },
  methods: {
    closedColonne(cle){
      console.log("colonne " + cle + " fermée")
      this.liste.splice(cle,1)
      localStorage.liste = this.liste
    },
    addColonne(subredditclicked){
      console.log("colonne " + subredditclicked + " ouverte")
      this.liste.push(subredditclicked)
      localStorage.liste = this.liste
    },
    redditReady(){
      console.log("reddit is ready")
      this.reddit.get('/subreddits/popular')
      .then(response=>response.json())
      .then((object)=>{
        console.log(object)
      })
      if(localStorage.getItem("liste")){
        this.liste = localStorage.liste.split(",")
      }
    }
  },
  components: {
    ColonneReddit,
    SubResearch
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
