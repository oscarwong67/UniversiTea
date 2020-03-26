<template>
  <section class='comment-section'>
    <section class='comments' v-for='comment in comments' :key='comment.Comment_ID'>
      <Comment
        class='comment'
        :poster="{
          name: comment.Fname, degreeType: comment.Degree_Type, isAnonymous: comment.Is_Anonymous
        }"
        :content="comment.Content" :school="comment.SchoolName" :commentID="comment.Comment_ID"
      />
    </section>
  </section>
</template>

<script>
import Comment from './Comment.vue';
import { API_ADDRESS } from '../constants';

export default {
  name: 'CommentSection',
  components: {
    Comment,
  },
  props: ['postid'],
  data: () => ({
    comments: [],
  }),
  async mounted() {
    const id = this.$props.postid;
    const res = await fetch(`${API_ADDRESS}/api/getComments/?postID=${id}`);
    const data = await res.json();
    this.comments = data;
  },
  methods: {
  },
};
</script>

<style scoped>
.comments {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.comment {
  cursor: pointer;
  width: 100%;
  margin-bottom: 1em;
  color:inherit;
  text-decoration: none;
}
</style>
