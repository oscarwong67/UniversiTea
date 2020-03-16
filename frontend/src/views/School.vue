<template>
  <div class='school container'>
    <Feed :schoolid='this.$route.params.schoolid'/>
  </div>
</template>

<script>
import Feed from '../components/Feed.vue';

export default {
  name: 'School',
  components: {
    Feed,
  },
};
</script>

<style scoped>

</style>
