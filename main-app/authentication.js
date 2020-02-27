'use strict'
const db = require('./db');
const helper = require('./helper');


// this file will control profile signup and login
exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        // Create a route for authentication

        // create a new profile
        server.route({
            method: 'POST',
            path: '/api/authentication/signup',
            handler: function (request, h) {
                try {
                    //  get school id from SCHOOL
                    const schoolResult = await db.query('SELECT * FROM SCHOOL WHERE SchoolName=?',[request.payload.schoolName]);
                    //  keeps sending this error
                    if (!schoolResult.length) throw new Error('Invalid school name!');

                    //  insert signup
                    const signupResults = await db.query('INSERT INTO USER SET ?', {
                        Fname: request.payload.Fname, Lname: request.payload.Lname,
                        Email: request.payload.email, Password: request.payload.password, 
                        Degree_Type: request.payload.Degree_Type, School_ID: schoolResult[0].School_ID
                    });
                    // if(!signupResults.insertId) throw new Error('Unable to insert into User during signup');
                    return helper.goodResponse(h);
                } catch (err) {
                    return helper.badResponse(err, h);
                }
            }
        });

        //Login to existing profile
        server.route({
            method: 'GET',
            path: '/api/authentication/login',
            handler: function (request, h){
                try{
                    var inputUsername = request.payload.username;
                    var inputPassword = request.payload.password;
                    //Query DB - If valid login, returned object will not be empty
                    var dbResult = await db.query('SELECT * FROM USER WHERE username = ? AND password = ?;', [inputUsername, inputPassword]);
                    return dbResult;
                } catch(err){
                    return helper.badResponse(err, h);
                }
            }
        });
    }
};