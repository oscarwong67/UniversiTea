'use strict';

const db = require('./db');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        // Read comments from database
        // Input: Post ID
        // Output: All comments in the post
        server.route({
            method: 'POST',
            path: '/api/addComment',
            handler: async function (request, h) {
                try {
                    var pid = parseInt(request.query.pid);
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

    }
}