<template>
  <header>
    <h2>
      Reddit project
    </h2>
  </header>
  <div id="colonnes">
    <ColonneReddit
      v-for="(el, index) in listeTriee"
      :key="el"
      :nom="el"
      :cle="index"
      v-on:CloseColonne="closedColonne"
      :api="reddit"
    />
    <div>
    <h4>Trier par</h4>
    <select v-model="selectedSort">
      <option v-for="(func, id) in sortFunctions" :key="id" @change="triChange">{{func.name}}</option>
    </select>
    <h4>Recherche</h4>
    <SubResearch
      :api="reddit"
      v-on:SubredditSelection="addColonne"
    />
    </div>
  </div>
  <footer>
        <p>© 2022 Julia Raybaudi</p>
  </footer>
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
        reddit : new Reddit(this.redditReady.bind(this)),
        selectedSort: undefined,
        sortFunctions: [
          {
            name: 'ne pas trier',
            func: undefined
          },
          {
            name: 'nom',
            func: (a,b) => a.display_name.localeCompare(b.display_name)
          },
          {
            name: 'date de creation',
            func: (a,b) => a.created - b.created
          }
        ]
    }
  },
  computed: {
    listeTriee() {
      let select = this.sortFunctions.find(x => x.name == this.selectedSort)

      if (select === undefined) {
        return this.liste.map(x => x.display_name)
      } else {
        return this.liste.slice().sort(select.func).map(x => x.display_name)
      }
    }
  },
  methods: {
    closedColonne(cle){
      console.log("colonne " + cle + " fermée")
      this.liste.splice(cle,1)
      localStorage.liste = JSON.stringify(this.liste)
    },
    addColonne(subredditclicked){
      console.log("colonne " + subredditclicked + " ouverte")
      this.liste.push(subredditclicked)
      localStorage.liste = JSON.stringify(this.liste)
    },
    redditReady(){
      console.log("reddit is ready")
      this.reddit.get('/subreddits/popular')
      .then(response=>response.json())
      .then((object)=>{
        console.log(object)
      })
      if(localStorage.getItem("liste")){
        this.liste = JSON.parse(localStorage.liste)
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
  #app, body, html, #colonnes {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    max-height: 100%;
    height : 100%;
    padding: 0;
    margin: 0;
    border: 0;
  }
  #colonnes {
    display: flex;
    flex-direction: row;
  }
  body{
    background-color: #ffffff;
  }
</style>
