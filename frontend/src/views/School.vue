<template>
  <div class='school container-fluid' v-if="this.schoolName !== ''">
    <section class="hero is-small">
        <div class="hero-body">
          <div class="container">
            <h1 class="title"> {{ this.schoolName }} </h1>
          </div>
        </div>
      </section>
    <div class='feed container'>
      <Feed :schoolid='this.$route.params.schoolid'/>
    </div>
  </div>
  <div class='school-not-found container' v-else>
    <NotFoundMessage :type='"school"'/>
  </div>
</template>

<script>
import Feed from '../components/Feed.vue';
import NotFoundMessage from '../components/NotFoundMessage.vue';
import { API_ADDRESS } from '../constants';

export default {
  name: 'School',
  components: {
    Feed,
    NotFoundMessage,
  },
  data: () => ({
    schoolName: '',
  }),
  async created() {
    const res = await fetch(`${API_ADDRESS}/api/getSchoolName/?schoolid=${this.$route.params.schoolid}`);
    const data = await res.json();
    if (data[0] !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      this.schoolName = data[0].SchoolName;
    }
  },
};
</script>

<style scoped>
.hero {
  background-color: #8ce3ff;
  overflow: visible;
  width: 100%;
}
.title {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: 500;
  font-size: 50px;
}
</style>
