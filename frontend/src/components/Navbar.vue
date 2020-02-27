<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
      <div class='navbar-brand'>
        <h1 class='navbar-item'>
          UniversiTea
        </h1>
        <a
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showNavMobile }"
          @click="showNavMobile=!showNavMobile"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class='navbar-menu' :class="{ 'is-active': showNavMobile }">
        <div class='navbar-start'>
          <router-link class='navbar-item' to="/">Home</router-link>
          <router-link class='navbar-item' to="/about">About</router-link>
        </div>
       <div class='navbar-end'>
          <b-button class='navbar-item' type="is-primary" outlined @click="isLoginModalActive=true">
            Log In
          </b-button>
          <b-button class='navbar-item' type="is-primary" @click="isSignupModalActive=true">
            Signup
          </b-button>
          <b-modal class='modal' :active.sync="isLoginModalActive">
            <section class="section card">
                <h2>Log In</h2>
                <div class="container">
                    <LoginForm @formChange='updateEmailPassword' />
                    <b-button class='navbar-item' type="is-primary" @click="handleLogin">
                      Log In!
                    </b-button>
                </div>
            </section>
          </b-modal>
          <b-modal class='modal' :active.sync="isSignupModalActive">
            <section class="section card">
                <h2>Signup</h2>
                <div class="container">
                    <LoginForm @formChange='updateEmailPassword' />
                    <b-field label="First Name">
                      <b-input v-model="fname"></b-input>
                    </b-field>
                    <b-field label="Last Name">
                      <b-input v-model="lname"></b-input>
                    </b-field>
                    <b-dropdown v-model="schoolName" aria-role="list">
                      <button class="button is-light" slot="trigger" slot-scope="{ active }">
                          <span>{{schoolName ? `School: ${schoolName}` : 'School'}}</span>
                          <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                      </button>
                      <b-dropdown-item value="TODO" aria-role="listitem">TODO</b-dropdown-item>
                    </b-dropdown>

                    <b-dropdown v-model="degreeType" aria-role="list">
                      <button class="button is-light" slot="trigger" slot-scope="{ active }">
                          <span>{{degreeType ? `Degree Type: ${degreeType}` : 'Degree Type'}}</span>
                          <b-icon :icon="active ? 'menu-up' : 'menu-down'"></b-icon>
                      </button>

                      <b-dropdown-item :value="degreeType" aria-role="listitem" v-for="degreeType in degreeTypes" :key="degreeType">
                        {{degreeType}}
                      </b-dropdown-item>
                    </b-dropdown>
                    <b-button class='navbar-item' type="is-primary" @click="handleSignup">
                      Sign Up!
                    </b-button>
                </div>
            </section>
          </b-modal>
       </div>
      </div>
    </nav>
</template>
<script>
import LoginForm from './LoginForm.vue';

export default {
  name: 'Navbar',
  components: {
    LoginForm,
  },
  data: () => ({
    isLoginModalActive: false,
    isSignupModalActive: false,
    showNavMobile: false,
    email: '',
    password: '',
    fname: '',
    lname: '',
    schoolName: '',
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
  }),
  methods: {
    updateEmailPassword(email, password) {
      this.email = email;
      this.password = password;
    },
    handleLogin() {

    },
    handleSignup() {

    },
  },
};
</script>

<style scoped>
.modal-content, .modal:nth-child(2), .card {
  overflow: scroll;
}
</style>