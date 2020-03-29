<template>
  <section class='comment-section' v-if="!noComments">
    <section class='comments' v-for='comment in comments' :key='comment.Comment_ID'>
      <div class='comment-wrapper container level-right'>
        <Comment
          class='comment'
          :poster="{
            name: comment.Fname, degreeType: comment.Degree_Type,
            isAnonymous: comment.isAnonymous, User_ID: comment.User_ID
          }"
          :content="comment.Content" :schoolname="comment.SchoolName"
          :schoolid="comment.School_ID" :commentID="comment.Comment_ID"
          :time="comment.Timestamp"
        />
      </div>
      <CommentFeed class='sub-feed' :postid='postID' :parentid='comment.Comment_ID'/>
    </section>
  </section>
  <h3 class="message" v-else>
      Theres no comments yet
    </h3>
</template>

<script>
import Comment from './Comment.vue';
import { API_ADDRESS } from '../constants';

export default {
  name: 'CommentFeed',
  components: {
    Comment,
  },
  props: ['postid', 'parentid'],
  data: () => ({
    comments: [],
    postID: '',
  }),
  async mounted() {
    this.postID = this.$props.postid;
    const { postid } = this.$props;
    const { parentid } = this.$props;
    const res = await fetch(`${API_ADDRESS}/api/getComments/?postID=${postid}&parentID=${parentid}`, {
      mode: 'cors',
    });
    const data = await res.json();
    this.comments = data;
  },
  computed: {
    noComments() {
      return (this.comments[0] === undefined);
    },
  },
};
</script>

<style scoped>
/* TODO: rigth justify */
.comments {
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */
  /* align-items: right; */
}
.message {
  background-color: white;
  padding: 1em;
}
.comment-wrapper {
  width: 95%;
  /* display: flex; */
  padding: .5em;
  align-items: right;
}
.comment {
  cursor: pointer;
  width: 100%;
  color:inherit;
  text-decoration: none;
}
.edit-buttons {
  padding: 1em;
  background-color: white;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.sub-feed {
  width: 95%;
}
</style>
