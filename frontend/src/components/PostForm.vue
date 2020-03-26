<template>
    <section class="post section">
      <div class='header'><b>{{this.$props.header}}</b></div>
      <div class='container'>
        <b-field>
          <b-input
            v-model="title" placeholder='Post Title'
            maxlength='100' @input='handleTitleChange'>
          </b-input>
        </b-field>
        <b-field>
          <vue-editor
            v-model="content" placeholder='Start typing!'
            :editor-toolbar="customToolbar" @input='handleContentChange'
          />
        </b-field>
        <b-field
          grouped label="Image/Video URLs"
          custom-class="url-input" class='url-input'
        >
          <div class='break' />
          <p class='break' v-for="media in mediaUrls" :key="media.url">
            <strong>url:</strong> {{media.url}}, <strong>type:</strong> {{media.type}}
            <b-button outlined @click='handleRmMediaChange(media)'>x</b-button>
          </p>
          <b-input
            v-model="currentMediaUrl" placeholder="https://example.com" type="text"
            maxlength='200' expanded
          />
          <b-button outlined
            @click='handleAddMediaChange'
            v-if='currentMediaUrl.length > 0'
          >+</b-button>
        </b-field>
        <b-checkbox class='checkbox' v-model='isAnonymous'
          :native-value="isAnonymous" @input='handleAnonChange'
        >
          Post Anonymously
        </b-checkbox>
      </div>
    </section>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import { getMediaType } from '../helper';

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
  props: ['header', 'oldTitle', 'oldContent', 'oldMediaUrls', 'oldAnonymous'],
  mounted() {
    this.title = this.$props.oldTitle || '';
    this.content = this.$props.oldContent || '';
    this.mediaUrls = this.$props.oldMediaUrls || [];
    if (this.$props.oldAnonymous) {
      this.isAnonymous = true;
    }
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
      if (this.$props.oldTitle === undefined) {
        const mediaInfo = getMediaType(this.currentMediaUrl);
        if (String(mediaInfo[1]) !== 'invalid media URL') {
          this.mediaUrls.push({
            url: mediaInfo[0],
            type: mediaInfo[1],
          });
        }
      }
      this.currentMediaUrl = '';
    },
    handleRmMediaChange(media) {
      let i;
      // eslint-disable-next-line no-plusplus
      for (i = 0; i < this.mediaUrls.length; i++) {
        if (this.mediaUrls[i] === media) {
          this.mediaUrls.splice(i, 1);
          break;
        }
      }
      this.$emit('mediaRm', i);
    },
    handleAnonChange() {
      this.$emit('anonChange', this.isAnonymous);
    },
  },
};

</script>
<style scoped>
.header {
  padding-bottom: 1em;
}
.post {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: white;
  padding-top: 1em;
}
.url-input {
  flex-wrap: wrap;
}
.break {
  width: 100%;
  flex-basis: 100%;
}
.checkbox {
  padding-left: .5em;
}
</style>
