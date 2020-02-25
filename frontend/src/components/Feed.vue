<template>
  <section class='feed'>
    <CreatePost />
    <hr/>
    <section class='posts'>
      <!-- TODO: REMOVE and replace with proper dynamic rendering -->
      <Post
        title='SENG401 #1'
        :poster="{
          name: 'Anonymous',
          degreeType: 'B.Sc'
        }"
        school="University of Calgary"
        content="Blah blah blah blah blah blah blah blah"
      />
    </section>
  </section>
</template>

<script>
import CreatePost from './CreatePost.vue';
import Post from './Post.vue';

export default {
  name: 'Feed',
  components: {
    CreatePost,
    Post,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
