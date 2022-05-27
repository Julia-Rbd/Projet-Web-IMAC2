<template>
  <div class="Post_this">
    <h5>
      <a :href="`https://www.reddit.com${post.permalink}`" target="_blank">
        {{post.title}}
      </a>
    </h5>
    <p v-if="post.is_self"> {{post.selftext}} </p>
    <img
      v-else-if="post.is_reddit_media_domain && !post.is_video"
      v-bind:src="post.url"
    />
  </div>
</template>

<script>
export default {
  name: 'PostReddit',
  mounted(){
  },
  methods: {
  },
  data: function() {
    return {}
  },
  props: {
    post : Object,
  }
}
</script>

<style>
  div .Post_this img{
    width: 100%;
  }
  div .Post_this p{
    max-height: 200px;
    overflow: auto;
  }
  div .Post_this h5 a{
    text-decoration: none;
    color : #000000;
  }
  div .Post_this h5 a:hover{
    text-decoration: underline;
    /*color : #5f5f5f;*/
  }
</style>
