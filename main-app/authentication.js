'use strict'
const db = require('./db');


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
                    const singupResults = db.query('INSERT INTO USER SET ?', {
                        email: request.body.email, username: request.body.username, password: request.body.password,
                        university: request.body.university, degree: request.body.degree
                    });
                    if(!singupResults.insertId) throw new Error('Unable to insert into User during signup');
                    return goodResponse();

                } catch (err) {
                    return badResponse(err);
                }
            }
        });

        //Login to existing profile
        server.route({
            method: 'POST',
            path: '/api/authentication/login',
            handler: function (request, h){
                try{
                    var inputUsername = request.payload.username;
                    var inputPassword = request.payload.password;
                    //Query DB - If valid login, returned object will not be empty
                    var dbResult = db.query('SELECT * FROM USER WHERE username = ? AND password = ?;', [inputUsername, inputPassword]);
                    return dbResult;
                } catch(err){
                    return badResponse(err);
                }
            }
        });
    }
};