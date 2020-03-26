<template>
  <div class='container comment'>
    <div class='comment-info'>
      <span class='posterName'>{{this.poster.isAnonymous ?
          'Anonymous' : this.poster.name}}&nbsp;(</span>
      <span class='degreeType'>{{this.poster.degreeType}} Student&nbsp;</span>
      <span class='school'>@ {{this.school}})</span>
    </div>
    <section class='body' v-html="content"/>
    <div class='reply'>
      <b-button type='is-info' size="is-small" outlined @click='handleReply'>Reply</b-button>
      <CreateComment class='create'
        :parentid='this.commentID' v-if='toggleCreateComment'
      />
    </div>
  </div>
</template>

<script>
import CreateComment from './CreateComment.vue';

export default {
  name: 'Comment',
  components: {
    CreateComment,
  },
  props: ['commentID', 'poster', 'school', 'content'],
  data: () => ({
    toggleCreateComment: false,
  }),
  methods: {
    handleReply() {
      this.toggleCreateComment = !this.toggleCreateComment;
    },
  },
};
</script>

<style scoped>
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
