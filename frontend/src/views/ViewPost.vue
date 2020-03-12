<template>
  <div class= "viewpost container">
    <hr/>
    <div class = 'posts container'>
        <Post
          :key='post[0].Post_ID'
          :poster="{name: post[0].FName, degreeType: post[0].Degree_Type}"
          :title="post[0].Title" :content="post[0].Content" :school="post[0].SchoolName"
        />
      <div class = 'buttons container level-right'>
        <b-button @click='handleEdit'>Edit</b-button>
        <b-button type='is-danger' icon-right='delete' @click='handleDelete'>Delete</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue';
import { API_ADDRESS } from '../constants';

export default {
  name: 'ViewPost',
  data: () => ({
    post: [],
  }),
  components: {
    Post,
  },
  async mounted() {
    const id = this.$route.params.postid;
    const res = await fetch(`${API_ADDRESS}/api/getPost/?postid=${id}`);
    const data = await res.json();
    this.post = data.post;
  },
  methods: {
    handleEdit() {
      // TODO
    },
    handleDelete() {
      alert('are you sure you want to delete this post?');
      // TODO
    },
  },
};
</script>

<style scoped>
.buttons {
  padding: 1em;
  background-color: white;
  border: none;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.posts {
  border-radius: 6px;
  background-color: white;
}
</style>
