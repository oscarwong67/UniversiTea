<template>
  <div class="home container">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <Feed />
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
