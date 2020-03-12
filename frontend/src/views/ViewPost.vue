<template>
  <div class= "viewpost">
    <hr/>
    <section class='posts'>
      <Post
        :key='post.Post_ID'
        :poster="{name: post.Fname, degreeType: post.Degree_Type}"
        :title="post.Title" :content="post.Content" :school="post.SchoolName"
      />
    </section>
  </div>
</template>

<script>
import Post from '../components/Post.vue';
import API_ADDRESS from '../constants';

export default {
  name: 'ViewPost',
  data: () => ({
    post: '',
  }),
  components: {
    Post,
  },
  async mounted() {
    // TODO: fix hardcoded postid
    // console.log(this.$route.params);
    const id = this.$route.params;
    const res = await fetch(`${API_ADDRESS}/api/getPost/?postid=${id}`);
    console.log(res);
    // const data = await res.json();
    // console.log(data);
    // this.post = data.post;
  },
};
</script>
