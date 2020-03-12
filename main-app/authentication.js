'use strict'
const db = require('./db');
const helper = require('./helper');

// Bcrypt setup
const Bcrypt = require('bcrypt');
const saltRounds = 10;

// this file will control profile signup and login
exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        // Create a route for authentication

        // create a new profile
        server.route({
            method: 'POST',
            path: '/api/authentication/signup',
            handler: async function (request, h) {
                try {
                    //params needed
                    const Fname = request.payload.Fname;
                    const Lname = request.payload.Lname;
                    const Email = request.payload.email;
                    const inputPassword = request.payload.password;
                    const schoolName = request.payload.schoolName;
                    const Degree_Type = request.payload.Degree_Type;
        
                    //  get school id from SCHOOL
                    const schoolResult = await db.query('SELECT * FROM SCHOOL WHERE SchoolName=?', [schoolName]);
                    if (!schoolResult.length) throw new Error('Invalid school name!');

                    //  insert signup
                    const password = Bcrypt.hashSync(inputPassword, saltRounds);
                    const signupResults = await db.query('INSERT INTO USER SET ?', {
                        Fname, Lname, Email, password, Degree_Type, 
                        School_ID: schoolResult[0].School_ID
                    });
                    return helper.goodResponse(h);
                } catch (err) {
                    return helper.badResponse(h, err);
                }
            }
        }),

        //Login to existing profile
        server.route({
            method: 'GET',
            path: '/api/authentication/login',
            handler: async function (request, h){
                try{
                    //params
                    const inputEmail = request.query.email;
                    const inputPassword = request.query.password;
                    //find account
                    const user = await db.query('SELECT * FROM USER WHERE Email=?;', [inputEmail]);
                    if (!user.length) {
                        return { isValid: false, credentials: null };
                    }
                    const match = await Bcrypt.compare(inputPassword, user[0].Password);
                    var credentials = { isValid: match };
                    if(match) {
                        credentials.User_ID = user[0].User_ID;
                        credentials.School_ID = user[0].School_ID;
                    }
                        return helper.goodResponse(h, credentials);
                } catch(err){
                    return helper.badResponse(h, err);
                }
            }
        });
    }
};