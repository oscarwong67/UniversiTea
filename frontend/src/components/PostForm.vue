<template>
    <section class="create-post section">
      <div class='container'>
        <b-field>
          <b-input
            v-model="title" placeholder='Post Title'
            maxlength='100' @input='handleTitleChange'>
          </b-input>
        </b-field>
        <b-field>
          <vue-editor
            v-model="content"
            placeholder='Start typing!'
            :editor-toolbar="customToolbar"
            @input='handleContentChange'
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
            <b-button outlined @click='handleRmMediaChange(idx)'>x</b-button>
          </p>
          <b-input
            v-model="currentMediaUrl"
            placeholder="https://example.com"
            type="text"
            maxlength='200'
            expanded
          />
          <b-button outlined
            @click='handleAddMediaChange'
            v-if='currentMediaUrl.length > 0'
          >+</b-button>
        </b-field>
        <b-checkbox v-model='isAnonymous' @input='handleAnonChange'>Post Anonymously</b-checkbox>
      </div>
    </section>
</template>

<script>
import { VueEditor } from 'vue2-editor';

export default {
  name: 'PostForm',
  components: {
    VueEditor,
  },
  data: () => ({
    customToolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['code-block'],
    ],
    title: '',
    content: '',
    mediaUrls: [],
    currentMediaUrl: '',
    isAnonymous: false,
  }),
  props: ['oldTitle', 'oldContent', 'oldMediaUrls', 'oldAnonymous'],
  created() {
    this.title = this.$props.oldTitle;
    this.content = this.$props.oldContent;
    if (this.$props.oldMediaUrls !== undefined) {
      this.mediaUrls = this.$props.oldMediaUrls;
    }
    this.isAnonymous = this.$props.oldAnonymous;
  },
  methods: {
    handleTitleChange() {
      this.$emit('titleChange', this.title);
    },
    handleContentChange() {
      this.$emit('contentChange', this.content);
    },
    handleAddMediaChange() {
      this.$emit('mediaAdd', this.currentMediaUrl);
      this.addMediaUrl();
    },
    handleRmMediaChange(index) {
      this.$emit('mediaRm', index);
      this.mediaUrls.splice(index);
    },
    handleAnonChange() {
      this.$emit('anonChange', this.isAnonymous);
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
  },
};

</script>
<style scoped>
.create-post {
  background-color: white;
  order: 2px solid white;
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
  padding-top: 0px;
  padding-left: none;
}
</style>
