<template>
  <div class="search-results container">
    <span class='page-header'>Search results for: "{{this.$route.params.searchkeys}}"</span>
    <Feed :schoolid="this.$route.params.schoolid" :searchkeys="this.$route.params.searchkeys" />
  </div>
</template>

<script>
import Feed from '../components/Feed.vue';

export default {
  name: 'Home',
  components: {
    Feed,
  },
};
</script>

<style scoped>
.search-results {
  padding: 1em;
  padding-top: 2em;
}
.page-header {
  font-size: 1.5em;
}
</style>
