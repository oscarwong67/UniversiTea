<template>
<div class='create-post container'>
  <PostForm class='form'
    :header='"Create a post"'
    @titleChange='updateTitle($event)' @contentChange='updateContent($event)'
    @mediaAdd='addMediaUrl($event)' @mediaRm='removeMediaUrl($event)'
    @anonChange='updateAnon($event)'
  />
  <div class='buttons'>
    <b-button type="is-primary" outlined @click='handleSavingContent'>Post</b-button>
  </div>
</div>
</template>

<script>
import PostForm from './PostForm.vue';
import { API_ADDRESS } from '../constants';
import { getMediaType } from '../helper';

export default {
  name: 'CreatePost',
  components: {
    PostForm,
  },
  data: () => ({
    title: '',
    content: '',
    mediaUrls: [],
    isAnonymous: '',
  }),
  methods: {
    updateTitle(newTitle) {
      this.title = newTitle;
    },
    updateContent(newContent) {
      this.content = newContent;
    },
    updateMedia(newMedia) {
      this.mediaUrls = newMedia;
    },
    updateAnon(newAnonymous) {
      this.isAnonymous = newAnonymous;
    },
    addMediaUrl(currentMediaUrl) {
      const mediaInfo = getMediaType(currentMediaUrl);
      if (String(mediaInfo[1]) !== 'invalid media URL') {
        this.mediaUrls.push({
          url: mediaInfo[0],
          type: mediaInfo[1],
        });
      } else {
        this.$buefy.dialog.alert({
          message: 'The URL you entered is invalid!',
          type: 'is-warning',
        });
      }
    },
    removeMediaUrl(index) {
      this.mediaUrls.splice(index, 1);
    },
    async handleSavingContent() {
      // You have the content to save
      const mediaUrls = this.mediaUrls.map((mediaUrl) => ({
        ...mediaUrl,
      }));
      const res = await fetch(`${API_ADDRESS}/api/addPost/`, {
        mode: 'cors',
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
      if (res.status === 200) {
        this.$buefy.toast.open('Post created!');
        this.$router.go();
      } else {
        this.$buefy.toast.open('Post could not be posted. Please try again later');
      }
    },
  },
};
</script>

<style scoped>
.form {
  padding-bottom: 0px;
}
.buttons {
  padding-left: 1.5em;
  padding-top: 1em;
  padding-bottom: 1em;
  background-color: white;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
</style>
