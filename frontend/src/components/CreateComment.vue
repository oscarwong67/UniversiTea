<template>
<div class='create-comment container'>
  <div class='header'><b>Write a comment</b></div>
  <b-input type='textarea' placeholder='Share your thoughts!' v-model="content"/>
  <b-checkbox class='checkbox' v-model='isAnonymous' @input='handleAnonChange'>
    Comment Anonymously
  </b-checkbox>
  <div class='buttons container'>
    <b-button type="is-primary" outlined @click='handleSavingContent'>Reply</b-button>
  </div>
</div>
</template>

<script>
import { API_ADDRESS } from '../constants';

export default {
  name: 'CreateComment',
  data: () => ({
    content: '',
    isAnon: '',
  }),
  methods: {
    async handleSavingContent() {
      await fetch(`${API_ADDRESS}/api/addPost/`, {
        method: 'POST',
        body: JSON.stringify({
          title: this.title,
          content: this.content,
          user: localStorage.getItem('User_ID'),
          isAnonymous: this.isAnonymous,
          school: localStorage.getItem('School_ID'),
          mediaUrls,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      this.$buefy.toast.open('Post created!');
      this.$router.go();
    },
  },
};
</script>

<style scoped>
.header {
  padding-bottom: .5em;
}
.checkbox {
  padding: 1em;
  padding-left: .5em;
}
.buttons {
  padding-bottom: 1em;
}
</style>
