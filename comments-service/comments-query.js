'use strict';

const helper = require('./helper');

const db = require('./db');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        // Read comments from database
        // Input: Post ID
        // Output: All comments in the post
        server.route({
            method: 'GET',
            path: '/api/getComment',
            handler: async function (request, h) {
                try {
                    let pid = parseInt(request.query.pid);
                    const comments = db.query(
                        `
                        SELECT *
                        FROM COMMENT
                        WHERE User_ID = ${pid}
                        `
                    ); // I dont know if this syntax is correct
                    return {comments};
                } catch(err) {

                }
            }
        });


        server.route({
            method: 'GET',
            path: '/api/getEvent',
            handler: async function (request, h) {
                try {
                    let pid = parseInt(request.query.pid);
                    const events = db.query(
                        `
                        SELECT *
                        FROM EVENT
                        WHERE Event_ID = ${pid}
                        `
                    ); // I dont know if this syntax is correct
                    return {events};
                } catch(err) {

                }
            }
        });
    }
}