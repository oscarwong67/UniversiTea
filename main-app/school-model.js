'use strict'
const db = require('./db');
const helper = require('./helper');

const getSchools = async () => {
  //gets all schools in db
  const schools = await db.query('SELECT SchoolName, School_ID FROM SCHOOL');
  if (!schools.length) throw new Error('Error getting school names!');
  return schools;
}

const getSchoolName = async (id) => {
  const schools = await db.query('SELECT SchoolName FROM SCHOOL WHERE ?', { School_ID: id });
  if (!schools.length) throw new Error('Error getting school names!');
  return schools;
}

module.exports = { getSchools, getSchoolName };