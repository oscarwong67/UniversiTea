<template>
<div class='edit-post container'>
  <div class='header'><b>Edit post</b></div>
  <PostForm
    class='form'
    :oldTitle="this.title" :oldContent="this.content"
    :oldMediaUrls="this.mediaUrls" :oldAnonymous="this.isAnonymous"
    @titleChange='updateTitle($event)'
    @contentChange='updateContent($event)'
    @mediaAdd='addMediaUrl($event)'
    @mediaRm='removeMediaUrl($event)'
    @anonChange='updateAnon($event)'
  />
  <div class='buttons container'>
    <b-button type="is-primary" @click='handleSavingContent'>Save</b-button>
    <b-button @click='handleCancel'>Cancel</b-button>
  </div>
</div>
</template>

<script>
import PostForm from './PostForm.vue';
import { API_ADDRESS } from '../constants';

export default {
  name: 'EditPost',
  components: {
    PostForm,
  },
  props: ['oldTitle', 'oldContent', 'oldMediaUrls', 'oldAnonymous'],
  data: () => ({
    title: '',
    content: '',
    mediaUrls: [],
    isAnonymous: '',
  }),
  created() {
    this.title = this.$props.oldTitle;
    this.content = this.$props.oldContent;
    if (this.$props.oldMediaUrls !== undefined) {
      this.mediaUrls = this.$props.oldMediaUrls;
    }
    this.isAnonymous = this.$props.oldAnonymous;
  },
  methods: {
    updateTitle(newTitle) {
      this.title = newTitle;
    },
    updateContent(newContent) {
      this.content = newContent;
    },
    // NOTE: i dont think we need addMediaUrl anymore but gonna leave it here just incase
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
      // console.log(this.mediaUrls);
    },
    removeMediaUrl(index) {
      // console.log(this.mediaUrls);
      this.mediaUrls.splice(index);
    },
    updateAnon(newAnonymous) {
      // TODO: fix warning:
      // [Vue warn]: Avoid using non-primitive value as key, use string/number value instead.
      this.isAnonymous = newAnonymous;
    },
    handleCancel() {
      this.$buefy.dialog.confirm({
        message: 'Are you sure you want to delete the changes you made to this post? This action cannot be undone.',
        confirmText: 'Delete Changes',
        cancelText: 'Continue Editing',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: () => {
          this.$router.go();
        },
      });
    },
    async handleSavingContent() {
      // You have the content to save
      const id = this.$route.params.postid;
      const mediaUrls = this.mediaUrls.map((mediaUrl) => ({
        ...mediaUrl,
      }));
      const res = await fetch(`${API_ADDRESS}/api/editPost/`, {
        method: 'POST',
        body: JSON.stringify({
          postid: id,
          title: this.title,
          content: this.content,
          isAnonymous: this.isAnonymous,
          mediaUrls,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log(data);
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
