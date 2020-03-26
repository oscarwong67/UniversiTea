<template>
<div class='create-comment container'>
  <div class='header'><b>Write a comment</b></div>
  <b-input type='textarea' placeholder='Share your thoughts!' v-model="content"/>
  <b-checkbox class='checkbox' v-model='isAnonymous'>Reply Anonymously</b-checkbox>
  <div class='buttons container'>
    <b-button type="is-primary" outlined @click='handleSavingContent'>Post Comment</b-button>
  </div>
</div>
</template>

<script>
import { API_ADDRESS } from '../constants';

export default {
  name: 'CreateComment',
  props: ['parentid'],
  data: () => ({
    content: '',
    isAnonymous: '',
  }),
  methods: {
    async handleSavingContent() {
      // TODO: uh dont really know how adding comment works so need to fix this
      let parent = null;
      if (this.$props !== undefined) {
        parent = this.$props.parentid;
      }
      const res = await fetch(`${API_ADDRESS}/api/addComment`, {
        method: 'POST',
        body: JSON.stringify({
          content: this.content,
          userID: localStorage.getItem('User_ID'),
          postID: this.$route.params.postid,
          parentID: parent,
          isAnon: this.isAnonymous,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // TODO: check that it was actually successful
      console.log(res);
      if (res.status === 200) {
        this.$buefy.toast.open('Comment posted!');
        this.$router.go();
      } else {
        this.$buefy.toast.open('Comment could not be posted. Try again later');
      }
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
