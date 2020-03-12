<template>
  <section class='feed section'>
    <CreatePost />
    <hr/>
    <section class='posts'>
      <Post
        v-for='post in posts'
        :key='post.Post_ID'
        :poster="{name: post.Fname, degreeType: post.Degree_Type}"
        :title="post.Title" :content="post.Content" :school="post.SchoolName"
      />
    </section>
  </section>
</template>

<script>
import CreatePost from './CreatePost.vue';
import Post from './Post.vue';
// import { API_ADDRESS } from '../constants';

export default {
  name: 'Feed',
  components: {
    CreatePost,
    Post,
  },
  data: () => ({
    posts: [],
  }),
  async mounted() {
    // TODO: add query parameters similar to how I did it in the job board
    console.log(this.$route.params);
    // const res = await fetch(`${API_ADDRESS}/api/feed/?page=1&limit=9`);
    // const data = await res.json();
    // console.log(data.posts);
    // this.posts = data.posts;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
