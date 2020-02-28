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
            handler: async function (request, h) {
                try {
                    //  get school id from SCHOOL
                    const schoolResult = await db.query('SELECT * FROM SCHOOL WHERE SchoolName=?', [request.payload.schoolName]);
                    //  keeps sending this error
                    if (!schoolResult.length) throw new Error('Invalid school name!');

                    //  insert signup
                    const signupResults = await db.query('INSERT INTO USER SET ?', {
                        Fname: request.payload.Fname, Lname: request.payload.Lname,
                        Email: request.payload.email, Password: request.payload.password,
                        Degree_Type: request.payload.Degree_Type, School_ID: schoolResult[0].School_ID
                    });
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
            handler: async function (request, h){
                try{
                    const inputEmail = request.query.email;
                    const inputPassword = request.query.password;
                    //Query DB - If valid login, returned object will not be empty
                    const dbResult = await db.query('SELECT * FROM USER WHERE Email=? AND Password=?;', [inputEmail, inputPassword]);
                    h.authenticated({credentials: {User_ID: dbResult[0].User_ID, School_ID: dbResult[0].School_ID }});
                    return helper.goodResponse(h);
                } catch(err){
                    return helper.badResponse(err, h);                }
            }
        });
    }
};