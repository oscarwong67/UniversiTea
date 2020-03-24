<template>
<div class='edit-post container'>
  <div class='header'><b>Edit post</b></div>
  <PostForm
    class='form'
    :oldTitle="this.title" :oldContent="this.content"
    :oldMediaUrls="this.mediaUrls" :oldAnonymous="this.isAnonymous"
    @titleChange='updateTitle($event)' @contentChange='updateContent($event)'
    @mediaAdd='addMediaUrl($event)' @mediaRm='removeMediaUrl($event)'
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
import { getMediaType } from '../helper';

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
    this.title = this.$props.oldTitle || '';
    this.content = this.$props.oldContent || '';
    this.mediaUrls = this.$props.oldMediaUrls || [];
    this.isAnonymous = this.$props.oldAnonymous || '';
  },
  methods: {
    updateTitle(newTitle) {
      this.title = newTitle;
    },
    updateContent(newContent) {
      this.content = newContent;
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
    updateAnon(newAnonymous) {
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
      await fetch(`${API_ADDRESS}/api/editPost/`, {
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
      this.$buefy.toast.open('Post updated!');
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