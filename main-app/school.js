'use strict'
const db = require('./db');
const helper = require('./helper');

module.exports = [
  {
    //gets all schools in dbF
    method: 'GET',
    path: '/api/getSchools',
    handler: async function (request, h) {
      try {
        const schools = await db.query('SELECT SchoolName, School_ID FROM SCHOOL');
        if (!schoolNames.length) throw new Error('Error getting school names!');
        return helper.goodResponse(h, schools);
      } catch (err) {
        return helper.badResponse(h, err);
      }
    }
  }
]