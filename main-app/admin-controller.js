'use-strict';

const adminModel = require('./admin-model');

module.exports = [
  {
    method: 'POST',
    path: '/api/admin/promote',
    async handler(request, h) {
      const res = await adminModel.getUsers(request);
      return res;
    }
  },

  {
    method: 'GET',
    path: '/api/admin/getusers',
    async handler(request, h) {
      const data = await adminModel.getUsers(request);
      return data;
    },
  },

  {
    method: 'POST',
    path: '/api/admin/addSchool',
    async handler(request, h) {
      const res = await adminModel.addSchool(request);
      return res;
    }
  },

  {
    method: 'POST',
    path: '/api/admin/deleteSchool',
    async handler(request, h) {
      const res = await adminModel.deleteSchool(request);
      return res;
    },
  },

  {
    method: 'POST',
    path: '/api/admin/editSchool',
    async handler(request, h) {
      const res = await adminModel.editSchool(request);
      return res;
    }
  }
]