'use strict';

const helper = require('./helper');
const schoolModel = require('./school-model');

module.exports = [
  {
    // gets all schools from db
    // Input: none
    // Output: array of all schools
    method: 'GET',
    path: '/api/getSchools',
    async handler(request, h) {
      try {
        const schools = await schoolModel.getSchool();
        return helper.goodResponse(h, schools);
      } catch (err) {
        return helper.badResponse(h, err);
      }
    }
  },
  {
    // searches for school by name in db
    // Input: schoolname
    // Output: the school obj
    method: 'GET',
    path: '/api/getSchoolName/',
    async handler(request, h) {
      try {
        const schoolNames = await schoolModel.getSchoolNames(request);
        return helper.goodResponse(h, schoolNames);
      } catch (err) {
        return helper.badResponse(h, err);
      }
    }
  }
]