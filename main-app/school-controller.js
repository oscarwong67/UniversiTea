'use strict';

const schoolModel = require('./school-model');
const helper = require('./helper');

module.exports = [
  {
    // gets all schools from db
    // Input: none
    // Output: array of all schools
    method: 'GET',
    path: '/api/getSchools',
    handler: async function (request, h) {
      try {
        const schools = await schoolModel.getSchools();
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
    handler: async function (request, h) {
      try {
        let id = parseInt(request.query.schoolid);
        const res = await schoolModel.getSchoolName(id);
        return helper.goodResponse(h, res);
      } catch (err) {
        return helper.badResponse(h, err);
      }
    }
  }
]