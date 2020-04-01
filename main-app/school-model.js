'use strict'
const db = require('./db');
const helper = require('./helper');

const getSchools = async (h) => {
  //gets all schools in db
  try {
    const schools = await db.query('SELECT SchoolName, School_ID FROM SCHOOL');
    if (!schools.length) throw new Error('Error getting school names!');
    return helper.goodResponse(h, schools);
  } catch (err) {
    return helper.badResponse(h, err);
  }
}

const getSchoolName = async (request, h) => {
  try {
    let id = parseInt(request.query.schoolid);
    const schools = await db.query('SELECT SchoolName FROM SCHOOL WHERE ?', { School_ID: id });
    if (!schools.length) throw new Error('Error getting school names!');
    return helper.goodResponse(h, schools);
  } catch (err) {
    return helper.badResponse(h, err);
  }
}

module.exports = { getSchools, getSchoolName };