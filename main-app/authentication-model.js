'use-strict';
const db = require('./db');

// Bcrypt setup
const Bcrypt = require('bcrypt');
const saltRounds = 10;

const signup = async (Fname, Lname, Email, inputPassword, School_ID, Degree_Type) => {
  //  insert signup
  const password = Bcrypt.hashSync(inputPassword, saltRounds);
  const signupResults = await db.query('INSERT INTO USER SET ?', {
    Fname, Lname, Email, password, Degree_Type, School_ID
  });
  if (!signupResults.affectedRows) throw new Error('Failed to sign up!');
  return { User_ID: signupResults.insertId, School_ID, isValid: true }
}

const login = async (inputEmail, inputPassword) => {
  //find account
  const user = await db.query('SELECT * FROM USER WHERE Email=?;', [inputEmail]);
  if (!user.length) {
    return { isValid: false, credentials: null };
  }
  const match = await Bcrypt.compare(inputPassword, user[0].Password);
  var credentials = { isValid: match };
  if (match) {
    credentials.User_ID = user[0].User_ID;
    credentials.School_ID = user[0].School_ID;
    credentials.Is_Admin = user[0].Is_Admin;
    return credentials;
  }
  return null;
}

module.exports = { signup, login };