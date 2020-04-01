<template>
  <div class="school container-fluid" v-if="this.schoolName !== ''">
    <section class="hero is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ this.schoolName }}</h1>
        </div>
      </div>
    </section>
    <div class="feed container">
      <SearchBar class='searchbar' :schoolid='this.$route.params.schoolid'/>
      <CreatePost v-if="isLoggedIn && canPost" />
      <h3 class="message" v-else-if="isLoggedIn && !canPost">
        You can only post to your school's forum!
      </h3>
      <h3 class="message" v-else>Log In to Post and Comment!</h3>
      <hr />
      <Feed :schoolid="this.$route.params.schoolid" />
    </div>
  </div>
  <div class="school-not-found container" v-else>
    <NotFoundMessage :type="'school'" />
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar.vue';
import CreatePost from '../components/CreatePost.vue';
import Feed from '../components/Feed.vue';
import NotFoundMessage from '../components/NotFoundMessage.vue';
import { API_ADDRESS } from '../constants';

export default {
  name: 'School',
  components: {
    SearchBar,
    CreatePost,
    Feed,
    NotFoundMessage,
  },
  data: () => ({
    schoolName: '',
  }),
  async created() {
    const res = await fetch(
      `${API_ADDRESS}/api/getSchoolName/?schoolid=${this.$route.params.schoolid}`, {
        mode: 'cors',
      },
    );
    const data = await res.json();
    if (data[0] !== undefined) {
      // eslint-disable-next-line prefer-destructuring
      this.schoolName = data[0].SchoolName;
    }
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('User_ID');
    },
    canPost() {
      if (this.$route.params.schoolid === undefined) {
        return true;
      }
      if (localStorage.getItem('School_ID') === String(this.$route.params.schoolid)) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.feed {
  padding: 2em;
}
.hero {
  background-color: #8ce3ff;
  overflow: visible;
  width: 100%;
}
.title {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 500;
  font-size: 50px;
}
</style>
