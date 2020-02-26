<template>
    <section class="create-post">
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
        <b-field label="Image/Video">
            <b-input v-model="media" type='file' accept='image/*,video/*' multiple></b-input>
        </b-field>
        <b-button @click='handleSavingContent'>Submit</b-button>
      </div>
    </section>
</template>

<script>
import { VueEditor } from 'vue2-editor';

export default {
  name: 'CreatePost',
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
    media: '',
    content: '',
  }),
  methods: {
    handleSavingContent() {
      // You have the content to save
      console.log(this.content);
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
</style>
