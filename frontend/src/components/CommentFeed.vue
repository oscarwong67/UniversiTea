<template>
  <section class="comment-section" v-if="hasComments">
    <section class="comments" v-for="comment in comments" :key="comment.Comment_ID">
      <div class="comment-wrapper">
        <Comment
          class="comment"
          :poster="{
            name: comment.Fname,
            degreeType: comment.Degree_Type,
            isAnonymous: comment.isAnonymous,
            User_ID: comment.User_ID
          }"
          :content="comment.Content"
          :schoolname="comment.SchoolName"
          :schoolid="comment.School_ID"
          :commentID="comment.Comment_ID"
          :time="comment.Timestamp"
        />
      </div>
      <CommentFeed class='sub-feed'
          :postid='postID' :parentid='comment.Comment_ID' :isSubFeed='true'/>
    </section>
  </section>
  <h3 class="message" v-else-if="!hasComments && !this.$props.isSubFeed">
    There are no comments yet
  </h3>
</template>

<script>
/* eslint-disable no-param-reassign */
import Comment from './Comment.vue';
import { API_ADDRESS } from '../constants';

export default {
  name: 'CommentFeed',
  components: {
    Comment,
  },
  props: ['postid', 'parentid', 'isSubFeed'],
  data: () => ({
    comments: [],
    postID: '',
  }),
  async mounted() {
    this.postID = this.$props.postid;
    const { postid } = this.$props;
    const { parentid } = this.$props;
    const res = await fetch(`${API_ADDRESS}/api/getComments/?postID=${postid}&parentID=${parentid}`);
    const data = await res.json();
    this.comments = data;
  },
  computed: {
    hasComments() {
      return this.comments[0] !== undefined;
    },
  },
};
</script>

<style scoped>
/* TODO: rigth justify */
.comments {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
}
.message {
  background-color: white;
  padding: 1em;
}
.comment-wrapper {
  width: 100%;
  /* display: flex; */
  padding: 0.5em;
  align-items: right;
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
