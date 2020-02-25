<template>
    <section class="create-post">
      <div class='container'>
        <b-field label="Create a Post" >
          <b-input v-model="title" placeholder='Post Title' maxlength='100'></b-input>
        </b-field>
        <b-field>
          <b-input
            v-model="content"
            placeholder='Start typing!'
            maxlength='420'
            type='textarea'
            expanded
            has-counter>
          </b-input>
        </b-field>
        <b-field label="Image/Video">
            <b-input v-model="media" type='file'></b-input>
        </b-field>
      </div>
    </section>
</template>

<script>
export default {
  name: 'CreatePost',
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
