<template>
  <section class="comment-section" v-if="hasComments">
    <section class="comments" v-for="comment in topLevelComments" :key="comment.Comment_ID">
      <div class="comment-wrapper container level-right">
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
      <CommentFeed
        class="sub-feed"
        :postid="postID"
        v-if="comment.children && comment.children.length > 0"
        :topLevelCommentsProp="comment.children"
      />
    </section>
  </section>
  <h3 class="message" v-else>
    There's no comments yet! Be the first.
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
  props: ['postid', 'topLevelCommentsProp'],
  data: () => ({
    topLevelComments: [],
    postID: '',
  }),
  async mounted() {
    if (this.$props.topLevelCommentsProp && this.$props.topLevelCommentsProp.length > 0) {
      this.topLevelComments = this.$props.topLevelCommentsProp;
    } else {
      this.postID = this.$props.postid;
      const { postid } = this.$props;
      const res = await fetch(`${API_ADDRESS}/api/getComments/?postID=${postid}`, {
        mode: 'cors',
      });
      const data = await res.json();
      const comments = Object.entries(data).map((comment) => comment[1]);
      // map comment id to comment
      const topLevelCommentsObj = comments
        .filter((comment) => !comment.Parent_ID)
        .reduce((accumulatorObj, comment) => {
          accumulatorObj[comment.Comment_ID] = comment;
          accumulatorObj[comment.Comment_ID].children = [];
          return accumulatorObj;
        }, {});
      // map children to their parents (1 level deep)
      comments.forEach((comment) => {
        if (comment.Parent_ID) {
          topLevelCommentsObj[comment.Parent_ID].children.push(comment);
        }
      });
      this.topLevelComments = Object.values(topLevelCommentsObj);
    }
  },
  computed: {
    hasComments() {
      return this.topLevelComments && this.topLevelComments.length > 0;
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
  align-items: flex-end;
}
.message {
  background-color: white;
  padding: 1em;
}
.comment-wrapper {
  width: 95%;
  /* display: flex; */
  padding: 0.5em;
  align-items: right;
}
.comment {
  cursor: pointer;
  width: 100%;
  color: inherit;
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
