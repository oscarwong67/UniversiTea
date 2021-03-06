<template>
  <div class='container comment' v-if="!isEditing">
    <div class='comment-info'>
      <span class='posterName'>{{this.poster.isAnonymous ?
          'Anonymous' : this.poster.name}}&nbsp;(</span>
      <span class='degreeType'>{{this.poster.degreeType}} Student&nbsp;</span>
      <span class='school'>@ {{this.schoolname}})</span>
      <span class='time'> on {{this.formattedTime}}</span>
    </div>
    <section class='body'>{{this.content}}</section>
    <div class='reply'>
      <b-button type='is-info' size="is-small" outlined @click='handleReply'
        v-if="isLoggedIn && canComment">Reply</b-button>
      <CreateComment class='create'
        :parentid='this.commentID' :parentschoolid='this.schoolid' v-if='toggleCreateComment'
      />
    </div>
    <div class = 'edit-buttons container level-right' v-if="isOP">
      <div class='left-button'>
        <b-button @click='handleEdit'>Edit</b-button>
      </div>
      <b-button type='is-danger' icon-right='delete' @click='handleDelete'>Delete</b-button>
    </div>
  </div>
  <div v-else>
    <!-- CreateComment here acts as an edit comment component -->
    <CreateComment
      :commentid='this.commentID' :oldContent='this.content' :oldAnon='this.poster.isAnonymous'
    />
  </div>
</template>

<script>
import { formatTime } from '../helper';
import CreateComment from './CreateComment.vue';
import { API_ADDRESS } from '../constants';

export default {
  name: 'Comment',
  components: {
    CreateComment,
  },
  props: ['commentID', 'poster', 'schoolname', 'schoolid', 'content', 'time'],
  data: () => ({
    toggleCreateComment: false,
    isEditing: false,
    formattedTime: '',
  }),
  created() {
    this.formattedTime = formatTime(this.$props.time);
  },
  methods: {
    handleReply() {
      this.toggleCreateComment = !this.toggleCreateComment;
    },
    handleEdit() {
      this.isEditing = true;
    },
    async handleDelete() {
      this.$buefy.dialog.confirm({
        message: 'Are you sure you want to <b>delete</b> this comment? This action cannot be undone.',
        confirmText: 'Delete Comment',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          const commentid = this.$props.commentID;
          const res = await fetch(`${API_ADDRESS}/api/deleteComment`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
              commentID: commentid,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (res.status === 200) {
            this.$buefy.toast.open('Comment deleted!');
            this.$router.go();
          } else {
            this.$buefy.toast.open('Comment could not be deleted. Please try again later!');
          }
        },
      });
    },
  },
  computed: {
    isOP() {
      return (localStorage.getItem('User_ID') === String(this.poster.User_ID) || localStorage.getItem('Is_Admin'));
    },
    isLoggedIn() {
      return localStorage.getItem('User_ID');
    },
    canComment() {
      // console.log(this.$props.schoolid);
      return (localStorage.getItem('School_ID') === String(this.$props.schoolid));
    },
  },
};
</script>

<style scoped>
.left-button {
  padding-right: .5em;
}
.time {
  color: rgb(78, 78, 78);
  font-size: 85%;
}
.comment {
  background-color: white;
  border: 2px solid white;
  border-radius: 6px;
  padding: 1em;
}
.body {
  white-space: pre-wrap;
  padding-left: .5em;
}
.reply {
  padding-top: 1em;
}
.create {
  width: 90%;
  padding-top: 1em;
}
</style>
