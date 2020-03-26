<template>
<div class='create-comment container'>
  <div class='header'><b>Write a comment</b></div>
  <b-input type='textarea' placeholder='Share your thoughts!' v-model="content"/>
  <b-checkbox class='checkbox' v-model='isAnonymous' :native-value="isAnonymous">
    Reply Anonymously
  </b-checkbox>
  <div class='buttons container'>
    <b-button type="is-primary" outlined @click='handleSavingContent' v-if='!this.commentid'>
      Post Comment
    </b-button>
    <div v-else>
      <b-button type="is-primary" @click='handleUpdateContent'>Save</b-button>
      <b-button @click='handleCancel'>Cancel</b-button>
    </div>
  </div>
</div>
</template>

<script>
import { API_ADDRESS } from '../constants';

export default {
  name: 'CreateComment',
  props: ['parentid', 'commentid', 'oldContent', 'oldAnon'],
  data: () => ({
    content: '',
    isAnonymous: false,
  }),
  mounted() {
    this.content = this.$props.oldContent;
    if (this.$props.oldAnon) {
      this.isAnonymous = true;
    }
  },
  methods: {
    async handleSavingContent() {
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
      if (res.status === 200) {
        this.$buefy.toast.open('Comment posted!');
        this.$router.go();
      } else {
        this.$buefy.toast.open('Comment could not be posted. Please try again later');
      }
    },
    handleCancel() {
      this.$buefy.dialog.confirm({
        message: 'Are you sure you want to delete the changes you made to this comment? This action cannot be undone.',
        confirmText: 'Delete Changes',
        cancelText: 'Continue Editing',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: () => {
          this.$router.go();
        },
      });
    },
    // TODO: anonymous not implemented in backend
    async handleUpdateContent() {
      const id = this.$props.commentid;
      const res = await fetch(`${API_ADDRESS}/api/editComment`, {
        method: 'POST',
        body: JSON.stringify({
          commentID: id,
          newContent: this.content,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        this.$buefy.toast.open('Post updated!');
        this.$router.go();
      } else {
        this.$buefy.toast.open('Changes could not be saved. Please try again later');
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
