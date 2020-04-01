'use strict';

const authenticationModel = require('./authentication-model');

exports.plugin = {
  pkg: require('./package.json'),
  register: async function (server, options) {

    server.route({
      method: 'POST',
      path: '/api/authentication/signup',
      async handler (request, h) {
        const res = await authenticationModel.signup(request, h);
        return res;
      },
    });

    server.route({
      method: 'POST',
      path: '/api/authentication/login',
      async handler (request, h) {
        const res = authenticationModel.login(request, h);
        return res;
      },
    });
  }
}
