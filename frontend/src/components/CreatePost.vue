<template>
<div class='create-post container'>
  <div class='header'><b>Create a post</b></div>
  <PostForm class='form'
    @titleChange='updateTitle($event)'
    @contentChange='updateContent($event)'
    @mediaAdd='addMediaUrl($event)'
    @mediaRm='removeMediaUrl($event)'
    @anonChange='updateAnon($event)'
  />
  <div class='buttons container'>
    <b-button type="is-primary" @click='handleSavingContent'>Post</b-button>
  </div>
</div>
</template>

<script>
import PostForm from './PostForm.vue';
import { API_ADDRESS } from '../constants';

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
      // TODO: fix warning:
      // [Vue warn]: Avoid using non-primitive value as key, use string/number value instead.
      this.mediaUrls = newMedia;
    },
    updateAnon(newAnonymous) {
      // TODO: fix warning:
      // [Vue warn]: Avoid using non-primitive value as key, use string/number value instead.
      this.isAnonymous = newAnonymous;
    },
    addMediaUrl(currentMediaUrl) {
      // eslint-disable-next-line no-useless-escape
      const extension = currentMediaUrl.split(/\#|\?/)[0].split('.').pop().trim().toLowerCase();
      let type = 'invalid media URL';
      if (extension === 'jpg' || extension === 'png' || extension === 'jpeg' || extension === 'tiff' || extension === 'gif' || extension === 'webp') {
        type = 'image';
      } else if (extension === 'mp4' || extension === 'webm') {
        type = 'video';
      }
      this.mediaUrls.push({
        url: currentMediaUrl,
        type,
      });
      console.log(this.mediaUrls);
      // currentMediaUrl = '';
    },
    removeMediaUrl(index) {
      this.mediaUrls.splice(index);
    },
    async handleSavingContent() {
      // You have the content to save
      const mediaUrls = this.mediaUrls.map((mediaUrl) => ({
        ...mediaUrl,
      }));
      const res = await fetch(`${API_ADDRESS}/api/addPost/`, {
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
      console.log(res);
      this.$router.go();
    },
  },
};
</script>

<style scoped>
.header {
  padding: 1em;
  padding-bottom: 0em;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: white;
}
.buttons {
  padding: 1em;
  padding-top: 1em;
  background-color: white;
  border: none;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
</style>
