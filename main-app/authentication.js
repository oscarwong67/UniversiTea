'use strict'
const db = require('./db');
const helper = require('./helper');

// Bcrypt setup
const Bcrypt = require('bcrypt');
const saltRounds = 10;

// this file will control profile signup and login
module.exports = [
  {
    method: 'POST',
    path: '/api/authentication/signup',
    handler: async function (request, h) {
      try {
        //params needed
        const Fname = request.payload.Fname;
        const Lname = request.payload.Lname;
        const Email = request.payload.email;
        const inputPassword = request.payload.password;
        const schoolID = request.payload.schoolID;
        const Degree_Type = request.payload.Degree_Type;

        //  insert signup
        const password = Bcrypt.hashSync(inputPassword, saltRounds);
        const signupResults = await db.query('INSERT INTO USER SET ?', {
          Fname, Lname, Email, password, Degree_Type, schoolID
        });
        return helper.goodResponse(h, { User_ID: signupResults.insertId, School_ID: schoolResult[0].School_ID, isValid: true });
      } catch (err) {
        return helper.badResponse(h, err);
      }
    }
  },
  {
    method: 'POST',
    path: '/api/authentication/login',
    handler: async function (request, h) {
      console.log('HELP');
      try {
        //params
        const inputEmail = request.payload.email;
        const inputPassword = request.payload.password;
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

          //cookie creation
          let cookie = request.state.session;
          if (!cookie) {
            cookie = {
              username: inputEmail,
              firstVisit: false
            };
          }

          cookie.lastVisit = Date.now();
          h.response().state('session', cookie);
          //cookie found as request.state.session
        }
        return helper.goodResponse(h, credentials);
      } catch (err) {
        return helper.badResponse(h, err);
      }
    }
  }
]