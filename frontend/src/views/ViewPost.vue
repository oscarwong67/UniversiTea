<template>
  <div class= "viewpost">
    <hr/>
    <div class = 'container'>
      <section class='posts'>
        <Post
          :key='post[0].Post_ID'
          :poster="{name: post[0].Fname, degreeType: post[0].Degree_Type}"
          :title="post[0].Title" :content="post[0].Content" :school="post[0].SchoolName"
        />
        <hr/>
        <!-- <div class = "button has-addons is-right"> -->
          <b-button @click='handleEdit'>Edit</b-button>
        <!-- </div> -->
      </section>
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
    // TODO: handle post not found
    const id = this.$route.params.postid;
    const res = await fetch(`${API_ADDRESS}/api/getPost/?postid=${id}`);
    const data = await res.json();
    this.post = data.post;
  },
  methods: {
    handleEdit() {
      // TODO
    },
  },
};
</script>
