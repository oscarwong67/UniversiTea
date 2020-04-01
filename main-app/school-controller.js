'use strict';

const schoolModel = require('./school-model');

module.exports = [
  {
    // gets all schools from db
    // Input: none
    // Output: array of all schools
    method: 'GET',
    path: '/api/getSchools',
    handler: async function (request, h) {
      const res = await schoolModel.getSchools(h);
      return res;
    }
  },
  {
    // searches for school by name in db
    // Input: schoolname
    // Output: the school obj
    method: 'GET',
    path: '/api/getSchoolName/',
    handler: async function (request, h) {
      const res = await schoolModel.getSchoolName(request, h);
      return res;
    }
  }
]