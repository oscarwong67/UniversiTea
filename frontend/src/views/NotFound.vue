<template>
  <div class='not-found container'>
    <NotFoundMessage :type='"page"'/>
  </div>
</template>

<script>
import NotFoundMessage from '../components/NotFoundMessage.vue';

export default {
  name: 'NotFound',
  components: {
    NotFoundMessage,
  },
};
</script>

<style scoped>
.not-found {
  padding-top: 1em;
}
</style>
