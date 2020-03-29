<template>
  <div class='container comment' v-if="!isEditing">
    <div class='comment-info'>
      <span class='posterName'>{{this.poster.isAnonymous ?
          'Anonymous' : this.poster.name}}&nbsp;(</span>
      <span class='degreeType'>{{this.poster.degreeType}} Student&nbsp;</span>
      <span class='school'>@ {{this.school}})</span>
      <span class='time'> on {{this.formatedTime}}</span>
    </div>
    <section class='body' v-html="content"/>
    <div class='reply'>
      <b-button type='is-info' size="is-small" outlined @click='handleReply'>Reply</b-button>
      <CreateComment class='create'
        :parentid='this.commentID' v-if='toggleCreateComment'
      />
    </div>
    <div class = 'edit-buttons container level-right' v-if="isOP">
      <b-button @click='handleEdit'>Edit</b-button>
      <b-button type='is-danger' icon-right='delete' @click='handleDelete'>Delete</b-button>
    </div>
  </div>
  <div v-else>
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
  props: ['commentID', 'poster', 'school', 'content', 'time'],
  data: () => ({
    toggleCreateComment: false,
    isEditing: false,
    formatedTime: '',
  }),
  created() {
    this.formatedTime = formatTime(this.$props.time);
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
      return (localStorage.getItem('User_ID') === String(this.poster.User_ID));
    },
  },
};
</script>

<style scoped>
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
.reply {
  padding-top: 1em;
}
.create {
  width: 90%;
  padding-top: 1em;
}
</style>
