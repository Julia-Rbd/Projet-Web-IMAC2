<template>
  <div class="Col_this">
    <p> {{nom}} </p>
    <button v-on:click="emitCustomEvent"> {{"X"}} </button>     <!--//bouton pour fermer la colonne-->
    <div class="Col_posts">
      <PostReddit
        v-for="p in posts"
        :key = "p.id"
        :post = "p"
      />
    </div>
  </div>
</template>

<script>
import { Reddit } from '@/Reddit.js'
import PostReddit from './PostReddit.vue'

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
  },
  components: {
    PostReddit
  }
}
</script>

<style>
  div .Col_this{
    max-height: 100%;
    box-sizing: border-box;
    margin: 0;
    border: 0;
    padding: 0;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
  }
  div .Col_posts {
    max-width: 300px;
    overflow-y : scroll;
    box-sizing: border-box;
  }
  div .Col_posts img{
    width: 100%;
  }
  div .Col_posts p{
    max-height: 200px;
    overflow: auto;
  }
</style>
