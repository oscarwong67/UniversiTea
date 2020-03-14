<template>
    <section class="create-post section">
      <div class='container'>
        <b-field label="Create a Post" >
          <b-input v-model="title" placeholder='Post Title' maxlength='100'></b-input>
        </b-field>
        <b-field>
          <vue-editor
            v-model="content"
            placeholder='Start typing!'
            :editor-toolbar="customToolbar"
          />
        </b-field>
        <b-field
          grouped
          label="Image/Video URLs"
          custom-class="url-input"
          class='url-input'
        >
          <div class='break' />
          <p class='break' v-for="(mediaUrl, idx) in mediaUrls" :key="mediaUrl">
            {{mediaUrl}}
            <b-button outlined @click='removeMediaUrl(idx)'>x</b-button>
          </p>
          <b-input
            v-model="currentMediaUrl"
            placeholder="https://example.com"
            type="text"
            maxlength='200'
            expanded
          />
          <b-button outlined @click='addMediaUrl' v-if='currentMediaUrl.length > 0'>+</b-button>
        </b-field>
        <b-button @click='handleSavingContent'>Submit</b-button>
        <b-checkbox v-model='isAnonymous'>Post Anonymously</b-checkbox>
      </div>
    </section>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import { API_ADDRESS } from '../constants';

export default {
  name: 'CreatePost',
  components: {
    VueEditor,
  },
  props: ['defaultTitle', 'defaultContent', 'defaultMediaUrls'],
  data: () => ({
    customToolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['code-block'],
    ],
    title: this ? Object.assign('', this.defaultTitle) : '',
    content: this ? Object.assign('', this.defaultContent) : '',
    mediaUrls: this ? Object.assign([], this.mediaUrls) : [],
    currentMediaUrl: '',
    isAnonymous: false,
  }),
  methods: {
    async handleSavingContent() {
      // You have the content to save
      const mediaUrls = this.mediaUrls.map((mediaUrl) => ({
        ...mediaUrl,
      }));
      const res = await fetch(`${API_ADDRESS}/api/addPost`, {
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
      const data = await res.json();
      console.log(data);
      this.content = '';
      this.title = '';
    },
    addMediaUrl() {
      // eslint-disable-next-line no-useless-escape
      const extension = this.currentMediaUrl.split(/\#|\?/)[0].split('.').pop().trim().toLowerCase();
      let type = 'invalid media URL';
      if (extension === 'jpg' || extension === 'png' || extension === 'jpeg' || extension === 'tiff' || extension === 'gif' || extension === 'webp') {
        type = 'image';
      } else if (extension === 'mp4' || extension === 'webm') {
        type = 'video';
      }
      this.mediaUrls.push({
        url: this.currentMediaUrl,
        type,
      });
      this.currentMediaUrl = '';
    },
    removeMediaUrl(index) {
      this.mediaUrls.splice(index);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.create-post {
    background-color: white;
    border: 2px solid white;
    border-radius: 6px;
    padding: 1em;
}

.url-input {
  flex-wrap: wrap;
}

.break {
  width: 100%;
  flex-basis: 100%;
}

.checkbox {
  padding: .5em;
  padding-left: 1em;
}
</style>
