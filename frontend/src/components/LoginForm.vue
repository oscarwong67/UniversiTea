<template>
  <div>
    <b-field label="Email">
      <b-input type="email"
        v-model="email"
        maxlength="30"
        @input="emailChange"
      >
      </b-input>
    </b-field>
    <b-field label="Password">
      <b-input type="password"
        v-model="password"
        maxlength="30"
        @input="passwordChange"
      >
      </b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    emailChange(email) {
      this.email = email;
      this.formChange();
    },
    passwordChange(password) {
      this.password = password;
      this.formChange();
    },
    formChange() {
      this.$emit('formChange', this.email, this.password);
    },
  },
};
</script>
