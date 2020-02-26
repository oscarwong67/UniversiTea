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
                    const singupResults = await db.query('INSERT INTO USER SET ?', {
                        email: request.body.email, usdrname: request.body.username, password: request.body.password, 
                        university: request.body.university, degree: request.body.degree
                    });
                    if(!singupResults.insertId) throw new Error('Unable to insert into User during signup');
                    return goodResponse();

                } catch (err) {
                    return badResponse(err);
                }
            }
        });

    }
};