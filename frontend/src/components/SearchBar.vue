<template>
  <b-field class='search' type='is-primary'>
    <b-input type='is-primary' v-model="search" placeholder="Search"
      icon="magnify" maxlength='100' expanded>
    </b-input>
    <p class="control">
      <b-button type="is-primary" outlined @click='handleSearch'>Search</b-button>
    </p>
  </b-field>
</template>

<script>
export default {
  name: 'SearchBar',
  props: ['schoolid'],
  data: () => ({
    search: '',
  }),
  methods: {
    handleSearch() {
      // do nothing if search is empty or all whitespace
      const whitespace = /^\s*$/;
      if (this.search !== '' && this.search.match(whitespace) === null) {
        if (this.$props.schoolid) {
          this.$router.push(`./${this.$route.params.schoolid}/search/${this.search}`);
        } else {
          this.$router.push(`./search/${this.search}`);
        }
      }
    },
  },
};
</script>

<style scoped>
.search {
  background-color: white;
  padding: 1em;
  border-radius: 6px;
}
</style>
