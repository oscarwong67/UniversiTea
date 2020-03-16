<template>
  <div class='container'>
    <div class='not-found container'>
      <header><strong>Sorry, the page you're looking for can't be found :(</strong></header>
      <span >Perhaps the page you were looking for has been deleted or moved.</span>
      <header/>
      <div class='buttons container'>
        <b-button type='is-primary' outlined @click="redirectHome">Back to Home</b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    redirectHome() {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.container {
  padding-top: 3em;
}
.not-found {
  background-color: white;
  padding: 1em;
  border-radius: 6px;
}
.buttons {
  padding-top: 2em;
}
</style>
