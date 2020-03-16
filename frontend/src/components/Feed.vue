<template>
  <section class='feed section'>
    <CreatePost v-if="isLoggedIn" />
    <h3 v-else>Log In to Post and Comment!</h3>
    <hr/>
    <section class='posts'>
      <a
        :href="`./viewpost/${post.Post_ID}`"
        v-for='post in posts'
        :key='post.Post_ID'
        target="_blank"
        noreferrer
        class='post-wrapper'
      >
        <Post
          class='post'
          :poster="{name: post.Fname, degreeType: post.Degree_Type, isAnonymous: post.Is_Anonymous}"
          :title="post.Title" :content="post.Content" :school="post.SchoolName"
        />
      </a>
    </section>
  </section>
</template>

<script>
import CreatePost from './CreatePost.vue';
import Post from './Post.vue';
import { API_ADDRESS } from '../constants';

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
    const res = await fetch(`${API_ADDRESS}/api/feed/?page=1&limit=9`);
    const data = await res.json();
    // console.log(data.posts);
    this.posts = data.posts;
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('User_ID');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.posts {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.post-wrapper {
  cursor: pointer;
  width: 100%;
  margin-bottom: 1em;
  color:inherit;
  text-decoration: none;
}

.post:hover {
  background-color: #ededed;
}
</style>
