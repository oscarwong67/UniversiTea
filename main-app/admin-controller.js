'use-strict';

const adminModel = require('./admin-model');
const helper = require('./helper');

module.exports = [
  {
    method: 'POST',
    path: '/api/admin/promote',
    async handler(request, h) {
      try {
        const { userId } = request.payload;
        const res = await adminModel.promote(userId);
        return helper.goodResponse(h, res);
      } catch(err) {
        return helper.badResponse(h, err);
      }
    }
  },

  {
    method: 'GET',
    path: '/api/admin/getusers',
    async handler(request, h) {
      try {
        const data = await adminModel.getUsers();
        return helper.goodResponse(h, data);
      } catch(err) {
        return helper.badResponse(h, err);
      }
    },
  },

  {
    method: 'POST',
    path: '/api/admin/addSchool',
    async handler(request, h) {
      const { schoolName } = request.payload;
      try {
        const res = await adminModel.addSchool(schoolName);
        return helper.goodResponse(h, res);
      } catch (err) {
        return helper.badResponse(h,err);
      }
    }
  },

  {
    method: 'POST',
    path: '/api/admin/deleteSchool',
    async handler(request, h) {
      const { schoolId } = request.payload;
      try {
        const res = await adminModel.deleteSchool(schoolId);
        return helper.goodResponse(h, res);
      } catch (err) {
        return helper.badResponse(h, err);
      }
    },
  },

  {
    method: 'POST',
    path: '/api/admin/editSchool',
    async handler(request, h) {
      const oldSchoolName = request.payload.schoolName;
      const newSchoolName = request.payload.newSchoolName;
      try {
        const res = await adminModel.editSchool(oldSchoolName, newSchoolName);
        return helper.goodResponse(h, res);
      } catch (err) {
        return helper.badResponse(h, err);
      }
    }
  }
]