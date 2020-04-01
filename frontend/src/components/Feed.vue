<template>
  <section class="feed section">
    <section class="posts" v-if="!noPosts">
      <a
        :href="`/viewpost/${post.Post_ID}`"
        v-for="post in posts"
        :key="post.Post_ID"
        target="_blank"
        noreferrer
        class="post-wrapper"
      >
        <Post
          class='post'
          :poster="{name: post.Fname, degreeType: post.Degree_Type, isAnonymous: post.Is_Anonymous}"
          :title="post.Title" :content="post.Content" :school="post.SchoolName"
          :time="post.Timestamp"
        />
      </a>
    </section>
    <h3 class="message" v-else>
      Theres no posts to display here...
    </h3>
  </section>
</template>

<script>
// import CreatePost from './CreatePost.vue';
import Post from './Post.vue';
import { API_ADDRESS } from '../constants';

export default {
  name: 'Feed',
  components: {
    // CreatePost,
    Post,
  },
  props: ['schoolid', 'searchkeys'],
  data: () => ({
    posts: [],
  }),
  async mounted() {
    let res;
    // no schoolid and search
    if (this.$props.schoolid === undefined && this.$props.searchkeys !== undefined) {
      res = await fetch(`${API_ADDRESS}/api/feed/?search=${this.$props.searchkeys}`, {
        mode: 'cors',
      });
    // schoolid, no search
    } else if (this.$props.schoolid !== undefined && this.$props.searchkeys === undefined) {
      res = await fetch(`${API_ADDRESS}/api/feed/?schoolID=${this.$props.schoolid}`, {
        mode: 'cors',
      });
    // schoolid and search
    } else if (this.$props.schoolid !== undefined && this.$props.searchkeys !== undefined) {
      res = await fetch(`${API_ADDRESS}/api/feed/?schoolID=${this.$props.schoolid}&search=${this.$props.searchkeys}`, {
        mode: 'cors',
      });
    } else {
      res = await fetch(`${API_ADDRESS}/api/feed/`, {
        mode: 'cors',
      });
    }
    const data = await res.json();
    console.log(data);
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
    noPosts() {
      return (this.posts === undefined);
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
  color: inherit;
  text-decoration: none;
}

.post:hover {
  background-color: #8ce2ff94;
  border: none;
}
</style>
