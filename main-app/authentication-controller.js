'use strict';

const authenticationModel = require('./authentication-model');
const helper = require('./helper');

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
        const res = await authenticationModel.signup(Fname, Lname, Email, inputPassword, schoolID, Degree_Type);
        return helper.goodResponse(h, res);
      } catch (err) {
        return helper.badResponse(h, err);
      }
    }
  },
  {
    method: 'POST',
    path: '/api/authentication/login',
    handler: async function (request, h) {//params
      try {
        const inputEmail = request.payload.email;
        const inputPassword = request.payload.password;
        const credentials = await authenticationModel.login(inputEmail, inputPassword);
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
        return helper.goodResponse(h, credentials);
      } catch(err) {
        return helper.badResponse(h, err);
      }
    }
  }
]