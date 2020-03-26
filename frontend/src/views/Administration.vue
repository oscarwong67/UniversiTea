<template>
  <div>
    <section class="section">
      <div class="card">
        <div class="container">
          <h3 class="heading section-heading">Manage Users</h3>
          <div class="columns">
            <div class="column">
              <h4 class="heading section-heading">Regular Users</h4>
              <ul>
                <li v-for="user in regularUsers" :key="user.User_ID">
                  {{ user.Fname }} {{ user.Lname }}
                  &nbsp;|&nbsp;
                  {{ user.Email }}
                  {{ '\t' }}
                  <b-button @click="promoteUser(user.User_ID, user.Fname)">Promote</b-button>
                </li>
              </ul>
            </div>
            <div class="column">
              <h4 class="heading section-heading">Admins</h4>
              <ul>
                <li v-for="admin in admins" :key="admin.User_ID">
                  {{ admin.Fname }} {{ admin.Lname }}
                  &nbsp;|&nbsp;
                  {{ admin.Email }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="card">
        <div class="container">
          <h3 class="heading section-heading">Manage Schools</h3>
          <h4 class="heading">Current Schools:</h4>
          <ul>
            <li v-for="school in schools" :key="school.School_ID">
              <b-button @click="deleteSchool(school.School_ID, school.SchoolName)">❌</b-button>
              {{ school.SchoolName }}
            </li>
          </ul>
          <form @submit.prevent="addNewSchool">
            <b-field class="grouped-input" label="Add a New School" grouped>
              <div class="break" />
              <b-input
                class="school-input"
                custom-class="school-input"
                v-model="newSchoolName"
                placeholder="School Name"
              />
              <b-button class="submit-btn" type="is-primary" native-type="submit" outlined>
                Submit
              </b-button>
            </b-field>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
/* eslint-disable no-alert */

import { API_ADDRESS } from '../constants';

export default {
  name: 'Administration',
  data: () => ({
    regularUsers: [],
    admins: [],
    schools: [],
    newSchoolName: '',
  }),
  methods: {
    async fetchAllUsers() {
      const res = await fetch(`${API_ADDRESS}/api/admin/getusers`);
      const users = await res.json();
      return users;
    },
    separateUsersAndAdmins(allUsers) {
      const regularUsers = [];
      const admins = [];
      allUsers.forEach((user) => {
        if (user.Is_Admin) {
          admins.push(user);
        } else {
          regularUsers.push(user);
        }
      });
      this.regularUsers = regularUsers;
      this.admins = admins;
    },
    async fetchSchools() {
      const res = await fetch(`${API_ADDRESS}/api/getSchools`);
      const schools = await res.json();
      return schools;
    },
    async addNewSchool() {
      if (!this.newSchoolName || this.newSchoolName.length < 1) {
        return;
      }
      const res = await fetch(`${API_ADDRESS}/api/admin/addSchool`, {
        method: 'POST',
        body: JSON.stringify({ schoolName: this.newSchoolName }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.School_ID) {
        this.schools.push({
          School_ID: data.School_ID,
          SchoolName: this.newSchoolName,
        });
      }
      this.newSchoolName = '';
    },
    async deleteSchool(schoolId, schoolName) {
      // eslint-disable-next-line no-restricted-globals
      const decision = confirm(
        `Are you sure you want to delete ${schoolName}? This will delete all posts and users associated with that school.`,
      );
      if (decision) {
        await fetch(`${API_ADDRESS}/api/admin/deleteSchool`, {
          method: 'POST',
          body: JSON.stringify({ schoolId }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        for (let i = 0; i < this.schools.length; i += 1) {
          if (this.schools[i].School_ID === schoolId) {
            this.schools.splice(i, 1);
          }
        }
      }
    },
    async promoteUser(userId, fname) {
      // eslint-disable-next-line no-restricted-globals
      const decision = confirm(
        `Are you sure you want to promote ${fname}?`,
      );
      if (decision) {
        await fetch(`${API_ADDRESS}/api/admin/promote`, {
          method: 'POST',
          body: JSON.stringify({ userId }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        let movedUser;
        for (let i = 0; i < this.regularUsers.length; i += 1) {
          if (this.regularUsers[i].User_ID === userId) {
            [movedUser] = this.regularUsers.splice(i, 1);
          }
        }
        this.admins.push(movedUser);
      }
    },
  },
  created() {
    console.log(typeof localStorage.getItem('Is_Admin'));
    if (!localStorage.getItem('Is_Admin')) {
      this.$router.push({ name: 'Home' });
    }
  },
  async mounted() {
    const allUsers = await this.fetchAllUsers();
    this.separateUsersAndAdmins(allUsers);
    this.schools = await this.fetchSchools();
  },
};
</script>

<style scoped>
.section-heading {
  padding: 10px 0;
}

.heading {
  font-weight: 600;
}

.submit-btn {
  margin-bottom: 10px;
}

.break {
  width: 100%;
  flex-basis: 100%;
}

.grouped-input {
  flex-wrap: wrap;
}

.school-input {
  min-width: 50vw;
}
</style>
