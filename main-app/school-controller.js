'use strict';

const helper = require('./helper');
const schoolModel = require('./school-model');

exports.plugin = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    
    // gets all schools from db
    // Input: none
    // Output: array of all schools
    server.route({
      method: 'GET',
      path: '/api/getSchools',
      handler: async function (request, h) {
        try {
          const schools = await schoolModel.getSchool();
          return helper.goodResponse(h, schools);
        } catch (err) {
          return helper.badResponse(h, err);
        }
      }
    });

    // searches for school by name in db
    // Input: schoolname
    // Output: the school obj
    server.route({
      method: 'GET',
      path: '/api/getSchoolName/',
      handler: async function (request, h) {
        try {
          const schoolNames = await schoolModel.getSchoolNames(request);
          return helper.goodResponse(h, schoolNames);
        } catch (err) {
          return helper.badResponse(h, err);
        }
      }
    });
  }
}