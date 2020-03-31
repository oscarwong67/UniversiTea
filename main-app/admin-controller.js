'use-strict';
require('dotenv').config();
const adminModel = require('./admin-model');

exports.plugin = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    
    server.route({
      method: 'GET',
      path: '/api/admin/promote',
      async handler(request, h) {
        const data = await adminModel.getUsers(request);
        return data;
      },
    });

    server.route({
      method: 'GET',
      path: '/api/admin/getUsers',
      async handler(request, h) {
        const data = await adminModel.getUsers(request);
        return data;
      },
    });

    server.route({
      method: 'POST',
      path: '/api/admin/addSchool',
      async handler(request, h) {
        const res = await adminModel.addSchool(request);
        return res;
      },
    });

    server.route({
      method: 'POST',
      path: '/api/admin/deleteSchool',
      async handler(request, h) {
        const res = await adminModel.deleteSchool(request);
        return res;
      },
    });

    server.route({
      method: 'POST',
      path: '/api/admin/editSchool',
      async handler(request, h) {
        const res = await adminModel.editSchool(request);
        return res;
      },
    });
  }
}