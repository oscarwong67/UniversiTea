'use strict';

// this file is for the example API routes I made
exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        // Create a route for example

        // access this by doing GET localhost:3000/api/example/getExample, and setting your name as one of the "query parameters"
        server.route({
            method: 'GET',
            path: '/api/example/getExample',
            // request is an object containing request info, h is an object containing stuff we can do with the response
            handler: function (request, h) {
                return `Hello ${request.query.name}, you've sent a GET request!`;
            }
        });

        // access this by doing GET localhost:3000/api/example/getExample2, and setting your name as one of the "named parameters"
        // e.g. localhost:3000/api/example/getExample2/Oscar
        server.route({
            method: 'GET',
            path: '/api/example/getExample2/{name}',
            handler: function (request, h) {
                return `Hello ${request.params.name}, you've sent a GET request!`;
            }
        });

        // access this by doing POST localhost:3000/api/example/postExample, 
        // and set your name in the "body" section, with "name" as the key and your name as the corresponding value under the x-www-form-urlencoded tab
        server.route({
            method: 'POST',
            path: '/api/example/postExample',
            handler: function (request, h) {
                // payload is what we include in the body of POST requests
                return `Hello ${request.payload.name}, you've sent a POST request!`
            }
        })
    },
};