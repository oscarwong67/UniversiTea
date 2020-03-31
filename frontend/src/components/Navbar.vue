<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" fixed-top>
    <div class="navbar-brand">
      <h1 class="navbar-item">UniversiTea</h1>
      <a
        role="button"
        class="navbar-burger"
        :class="{ 'is-active': showNavMobile }"
        @click="showNavMobile = !showNavMobile"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': showNavMobile }">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/about">About</router-link>
        <b-navbar-dropdown label="Schools" :hoverable="true">
          <div class="school-link" v-for="school in allSchools" :key="school.School_ID">
            <b-navbar-item :href="`/school/${school.School_ID}`" noreferrer>{{
              school.SchoolName
            }}</b-navbar-item>
          </div>
        </b-navbar-dropdown>
        <router-link class="navbar-item" to="/administration" v-if="isAdmin">
          Administration
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="double-button-container navbar-item" v-if="isLoggedIn">
          <div class="left-button">
            <NotificationDropdown />
          </div>
          <b-button outlined @click="logout">Log Out</b-button>
        </div>
        <div v-else class="navbar-item double-button-container">
          <div class="left-button">
            <b-button type="is-primary" outlined
              @click="isLoginModalActive = true">Log In</b-button>
          </div>
            <b-button type="is-primary" @click="isSignupModalActive = true">Signup</b-button>
        </div>
        <b-modal class="modal" :active.sync="isLoginModalActive">
          <section class="section card">
            <form @submit.prevent="handleLogin">
              <h2>Log In</h2>
              <div class="container">
                <LoginForm @formChange="updateEmailPassword" />
                <b-button class="navbar-item" type="is-primary" native-type="submit"
                  >Log In!</b-button
                >
              </div>
            </form>
          </section>
        </b-modal>
        <b-modal class="modal" :active.sync="isSignupModalActive">
          <section class="section card">
            <form @submit.prevent="handleSignup">
              <h2>Signup</h2>
              <div class="container">
                <LoginForm @formChange="updateEmailPassword" />
                <b-field label="First Name">
                  <b-input v-model="fname"></b-input>
                </b-field>
                <b-field label="Last Name">
                  <b-input v-model="lname"></b-input>
                </b-field>
                <b-dropdown v-model="school" aria-role="list">
                  <button class="button is-light" slot="trigger" slot-scope="{ active }">
                    <span>
                      {{ school ? `School: ${school.SchoolName}` : "School" }}
                    </span>
                    <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                  </button>
                  <div class='list'>
                    <b-dropdown-item
                      :value="school" aria-role="listitem"
                      v-for="school in allSchools" :key="school.SchoolName"
                    >{{ school.SchoolName }}</b-dropdown-item>
                  </div>
                </b-dropdown>
                <b-dropdown v-model="degreeType" aria-role="list">
                  <button class="button is-light" slot="trigger" slot-scope="{ active }">
                    <span>
                      {{ degreeType ? `Degree Type: ${degreeType}` : "Degree Type" }}
                    </span>
                    <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                  </button>
                  <div class='list'>
                    <b-dropdown-item
                      :value="degreeType" aria-role="listitem"
                      v-for="degreeType in degreeTypes" :key="degreeType"
                    >{{ degreeType }}</b-dropdown-item>
                  </div>
                </b-dropdown>
                <div class="submit">
                  <b-button class="navbar-item" type="is-primary" native-type="submit">
                    Sign Up!
                  </b-button>
                </div>
              </div>
            </form>
          </section>
        </b-modal>
      </div>
    </div>
  </nav>
</template>
<script>
import LoginForm from './LoginForm.vue';
import NotificationDropdown from './NotificationDropdown.vue';
import { API_ADDRESS } from '../constants';

export default {
  name: 'Navbar',
  components: {
    LoginForm,
    NotificationDropdown,
  },
  data: () => ({
    isLoginModalActive: false,
    isSignupModalActive: false,
    showNavMobile: false,
    email: '',
    password: '',
    fname: '',
    lname: '',
    school: '',
    degreeType: '',
    degreeTypes: [
      'B.A.',
      'B.Sc.',
      'B.comm.',
      'BFA',
      'M.A.',
      'M.Sc.',
      'MBA',
      'MFA',
      'Ph.D.',
      'J.D.',
      'M.D.',
      'DDS',
    ],
    allSchools: [],
  }),
  async mounted() {
    const res = await fetch(`${API_ADDRESS}/api/getSchools`, {
      mode: 'cors',
    });
    const data = await res.json();
    this.allSchools = data;
  },
  methods: {
    updateEmailPassword(email, password) {
      this.email = email;
      this.password = password;
    },
    afterLogin(data) {
      if (data.isValid) {
        localStorage.setItem('User_ID', data.User_ID);
        localStorage.setItem('School_ID', data.School_ID);
        if (data.Is_Admin) {
          localStorage.setItem('Is_Admin', data.Is_Admin);
        }
        this.$router.go();
      }
    },
    async handleLogin() {
      const res = await fetch(`${API_ADDRESS}/api/authentication/login`, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      this.afterLogin(data);
    },
    async handleSignup() {
      if (this.email && this.password && this.fname
        && this.lname && this.school && this.degreeType) {
        const res = await fetch(`${API_ADDRESS}/api/authentication/signup`, {
          mode: 'cors',
          method: 'POST',
          body: JSON.stringify({
            email: this.email,
            password: this.password,
            Fname: this.fname,
            Lname: this.lname,
            Degree_Type: this.degreeType,
            schoolID: this.school.School_ID,
          }),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        this.afterLogin(data);
      }
    },
    logout() {
      localStorage.removeItem('User_ID');
      localStorage.removeItem('School_ID');
      localStorage.removeItem('Is_Admin');
      this.$router.go();
    },
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('User_ID');
    },
    isAdmin() {
      return localStorage.getItem('Is_Admin');
    },
  },
};
</script>

<style scoped>
.modal,
.modal-content,
.card {
  max-height: auto;
  overflow: initial;
  border-radius: 6px;
}

.list {
  background: none;
  padding: 0px;
  max-height: 150px;
  overflow: auto;
}

.double-button-container {
  display: flex;
}

.left-button {
  padding-right: 0.5em;
}
.submit {
  padding-top: 1em;
}
</style>
