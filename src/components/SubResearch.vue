<template>
  <div>
    <input
      v-model="research"
      v-on:keydown.enter="doResearch"
    />
    <p> {{research}} </p>
    <p v-for="el in subreddit_names"
      :key="el.display_name"
      @click="emitevent(el)"
    >
        {{el.display_name}}
    </p>
  </div>
</template>

<script>
  import { Reddit } from '@/Reddit.js'
  export default {
    name: 'SubResearch',
    data: function() {
      return {
        research : "",
        subreddit_names : []
      }
    },
    computed: {
      sorted(){
          return this.sortedListByDate();
      }
    },
    methods: {
      doResearch : function(){
        console.log("research done")
        this.api.get('/subreddits/search?q=' + this.research)
        .then(response=>response.json())
        .then((object)=>{
          console.log(object)
          this.subreddit_names = object.data.children.map(x => x.data)
        })
      },
      emitevent : function(subredditclicked){
        this.$emit("SubredditSelection", subredditclicked)
      },
      sortedListByDate: function() {
        return this.subreddit_names.sort((a, b) => a.created > b.created ); //object.created
      }
    },
    props: {
      api : Reddit
    }
  }
</script>
