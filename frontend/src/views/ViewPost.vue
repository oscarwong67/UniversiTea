<template>
<div class='viewpost'>
<hr/>
  <div class= "view container" v-if="!isEditing">
    <div class = 'posts container' v-if="postExists">
        <Post
          :key='post[0].Post_ID'
          :poster="{name: post[0].FName, degreeType: post[0].Degree_Type}"
          :title="post[0].Title" :content="post[0].Content" :school="post[0].SchoolName"
        />
      <div class = 'buttons container level-right' v-if="isOP">
        <b-button @click='handleEdit'>Edit</b-button>
        <b-button type='is-danger' icon-right='delete' @click='handleDelete'>Delete</b-button>
      </div>
    </div>
    <div class='nopost container' v-else>
      <header>Sorry, the post you're looking for can't be found :(</header>
    </div>
  </div>
  <div class='edit container' v-else>
    <CreatePost/>
  </div>
</div>
</template>

<script>
import Post from '../components/Post.vue';
import CreatePost from '../components/CreatePost.vue';
import { API_ADDRESS } from '../constants';

export default {
  name: 'ViewPost',
  data: () => ({
    post: [],
    isEditing: false,
  }),
  components: {
    Post,
    CreatePost,
  },
  async mounted() {
    const id = this.$route.params.postid;
    const res = await fetch(`${API_ADDRESS}/api/getPost/?postid=${id}`);
    const data = await res.json();
    this.post = data.post;
  },
  methods: {
    handleEdit() {
      this.isEditing = true;
    },
    async handleDelete() {
      this.$buefy.dialog.confirm({
        message: 'Are you sure you want to <b>delete</b> this post? This action cannot be undone.',
        confirmText: 'Delete Post',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          await fetch(`${API_ADDRESS}/api/deletePost/`, {
            method: 'POST',
            body: JSON.stringify({
              postid: this.post[0].Post_ID,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          this.$buefy.toast.open('Post deleted!');
          this.$route.push('/');
        },
      });
    },
  },
  computed: {
    isOP() {
      if (localStorage.getItem('User_ID') === String(this.post[0].User_ID)) {
        return true;
      }
      return false;
    },
    postExists() {
      if (this.post[0] === undefined) {
        return false;
      }
      return true;
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
.nopost {
  background-color: white;
  border-radius: 6px;
  padding: 1em;
}
</style>
