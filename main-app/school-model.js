'use strict'
const db = require('./db');
const helper = require('./helper');

module.exports = [
  {
    //gets all schools in dbF
    method: 'GET',
    path: '/api/getSchools',
    handler: async function () {
      const schools = await db.query('SELECT SchoolName, School_ID FROM SCHOOL');
      if (!schools.length) throw new Error('Error getting school names!');
      return schools;
    }
  },

  {
    method: 'GET',
    path: '/api/getSchoolName/',
    handler: async function (request) {

        let id = parseInt(request.query.schoolid);
        const schools = await db.query('SELECT SchoolName FROM SCHOOL WHERE ?', { School_ID: id });
        if (!schools.length) throw new Error('Error getting school names!');
        return schools;
    }
  }
]