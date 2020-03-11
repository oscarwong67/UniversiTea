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
        <b-field label="Image/Video">
            <b-input v-model="media" type='file' accept='image/*,video/*' multiple></b-input>
        </b-field>
        <b-button @click='handleSavingContent'>Submit</b-button>
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
    async handleSavingContent() {
      // You have the content to save
      // TODO: fix hard coded userid and schoolid
      // console.log(this.content);
      const res = await fetch(`${API_ADDRESS}/api/addPost`, {
        method: 'POST',
        body: JSON.stringify({
          tite: this.content,
          content: this.content,
          user: 1,
          school: 1,
        }),
      });
      const data = await res.json();
      console.log(data);
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
