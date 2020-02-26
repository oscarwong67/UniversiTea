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

                } catch (err) {
                    console.log(err);
                    return badResponse;
                }
            }
        });

    }
};