'use-strict';

const db = require('./db');

const promote = async (userId) => {
  const userToAdmin = await db.query('UPDATE USER SET Is_Admin=1 WHERE User_ID=?', [userId]);
  if (!userToAdmin.affectedRows) throw new Error('Error setting ${userId} to admin');
  return userToAdmin;
}

const getUsers = async () => {
  const users = await db.query('SELECT * FROM USER');
  if (!users.length) throw new Error('Unable to fetch users from database.');
  return users;
}

const addSchool = async (schoolName) => {
  const addSchool = await db.query('INSERT INTO SCHOOL SET SchoolName=?', [schoolName]);
  if (!addSchool.affectedRows) throw new Error(`Unable to add school: ${schoolName}`);
  return { School_ID: addSchool.insertId };
}

const deleteSchool = async (schoolId) => {
    const res = await db.query('DELETE FROM SCHOOL WHERE School_ID=?', [schoolId]);
    if (!res.affectedRows) throw new Error(`Unable to delete school with ID: ${schoolId}`);
    return res;
}

const editSchool = async (oldSchoolName, newSchoolName) => {
    const updateSchoolName = await db.query('UPDATE SCHOOL SET SchoolName=? WHERE SchoolName=?', [newSchoolName, oldSchoolName]);
    if (!updateSchoolName.affectedRows) throw new Error(`No school with name ${oldSchoolName} was found`);
    return updateSchoolName;
}

module.exports = { promote, getUsers, addSchool, deleteSchool, editSchool };