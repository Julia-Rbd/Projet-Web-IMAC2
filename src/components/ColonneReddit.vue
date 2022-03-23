<template>
  <div>
    <p> {{nom}} </p>
    <button v-on:click="emitCustomEvent"> {{"X"}} </button>     <!--//bouton pour fermer la colonne-->
    <div class="colonne_d_images">
      <img v-for="(el, index) in images"
        :key="index"
        v-bind:src="el.url"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColonneReddit',
  emits: ["CloseColonne"],
  mounted(){
    let myself = this
    fetch('https://nekos.best/api/v1/hug?amount=2')
    .then(response=>response.json())
    .then((object)=>{
      myself.images = object.url
    })
  },
  methods: {
    emitCustomEvent : function(){
      this.$emit("CloseColonne", this.cle)
    }
  },
  data: function() {
    return {
      images: []
    }
  },
  props: {
    nom: String,
    cle: Number
  }
}
</script>

<style>
  div .colonne_d_images{
    display: flex;
    flex-direction: column;
  }
</style>
