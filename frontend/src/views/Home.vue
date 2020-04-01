<template>
  <div class="home container">
    <SearchBar class='searchbar'/>
    <CreatePost v-if="isLoggedIn" />
    <h3 class="message" v-else>Log In to Post and Comment!</h3>
    <hr />
    <Feed />
  </div>
</template>

<script>
import CreatePost from '../components/CreatePost.vue';
import SearchBar from '../components/SearchBar.vue';
import Feed from '../components/Feed.vue';

export default {
  name: 'Home',
  components: {
    SearchBar,
    CreatePost,
    Feed,
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('User_ID');
    },
  },
};
</script>

<style scoped>
.home {
  padding: 1em;
  padding-top: 2em;
}
</style>
