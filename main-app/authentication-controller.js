'use strict'

const authenticationModel = require('./authentication-model');

module.exports = [
  {
    method: 'POST',
    path: '/api/authentication/signup',
    handler: async function (request, h) {
      const res = await authenticationModel.signup(request, h);
      return res;
    }
  },

  {
    method: 'POST',
    path: '/api/authentication/login',
    handler: async function (request, h) {
      const res = authenticationModel.login(request, h);
      return res;
    }
  }
]