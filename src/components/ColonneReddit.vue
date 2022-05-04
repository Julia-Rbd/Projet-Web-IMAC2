<template>
  <div>
    <p> {{nom}} </p>
    <button v-on:click="emitCustomEvent"> {{"X"}} </button>     <!--//bouton pour fermer la colonne-->
    <div class="colonne_d_images">
      <div v-for="p in posts"
        :key="p.id"
      >
      <p v-if="p.is_self"> {{p.selftext}} </p>
      <img
        v-else-if="p.is_reddit_media_domain && !p.is_video"
        v-bind:src="p.url"
      />
      </div>
    </div>
  </div>
</template>

<script>
import { Reddit } from '@/Reddit.js'
export default {
  name: 'ColonneReddit',
  emits: ["CloseColonne"],
  mounted(){
    let myself = this
    this.api.get(`/r/${this.nom}/hot`)
    .then(response=>response.json())
    .then((object)=>{
      myself.posts = object.data.children.map(x => x.data).filter(x => !x.is_created_from_ads_ui)
      //object.data.children.filter(x=>x.data.is_reddit_media_domain)
    })
  },
  methods: {
    emitCustomEvent : function(){
      this.$emit("CloseColonne", this.cle)
    }
  },
  data: function() {
    return {
      posts : []
    }
  },
  props: {
    nom: String,
    cle: Number,
    api : Reddit
  }
}
</script>

<style>
  div .colonne_d_images {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin-left: 5px;
  }
  div .colonne_d_images img{
    width: 100%;
  }
  div .colonne_d_images p{
    max-height: 200px;
    overflow: auto;
  }
</style>
