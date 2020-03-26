<template>
  <section class='feed section'>
    <CreatePost v-if="isLoggedIn && canPost"/>
    <h3 class='message' v-else-if="isLoggedIn && !canPost">
      You can only post to your school's forum!
    </h3>
    <h3 class='message' v-else>Log In to Post and Comment!</h3>
    <hr/>
    <section class='posts'>
      <a
        :href="`/viewpost/${post.Post_ID}`"
        v-for='post in posts' :key='post.Post_ID'
        target="_blank" noreferrer class='post-wrapper'
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
  props: ['schoolid'],
  data: () => ({
    posts: [],
  }),
  async mounted() {
    // TODO: add query parameters similar to how I did it in the job board
    let res;
    if (this.$props === undefined) {
      res = await fetch(`${API_ADDRESS}/api/feed?page=1&limit=9`);
    } else {
      res = await fetch(`${API_ADDRESS}/api/feed?page=1&limit=9&schoolID=${this.$props.schoolid}`);
    }
    const data = await res.json();
    // console.log(data.posts);
    this.posts = data.posts;
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('User_ID');
    },
    canPost() {
      if (this.$props.schoolid === undefined) {
        return true;
      }
      if (localStorage.getItem('School_ID') === String(this.$props.schoolid)) {
        return true;
      }
      return false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message {
  background-color: white;
  padding: 1em;
}

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
  background-color: #8ce2ff94;
  border: none;
}
</style>
