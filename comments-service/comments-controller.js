'use strict';

const helper = require('./helper');

const commandModel = require('./command-model');
const queryModel = require('./query-model');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {

        // adding comments to event store database
        // Input: Comment ID, Post Content, User ID, Parent ID (if it is a reply)
        // Output: Void
        server.route({
            method: 'POST',
            path: '/api/addComment',
            handler: async function (request, h) {
                try {
                    await commandModel.addComment(request)
                    return helper.goodResponse(h, null);
                    //Call function for adding to current state database
                } catch(err) {
                    return helper.badResponse(h, err);
                }
            }
        });

        // editing a comment in the event store database
        // Input: Comment ID, Content
        // Output: Void
        server.route({
            method: 'POST',
            path: '/api/editComment',
            handler: async function (request, h) {
                try {
                    await commandModel.editComment(request);
                    return helper.goodResponse(h, null);
                } catch(err) {
                    return helper.badResponse(h, err);
                }
            }
        });

        // deleteing a comment in the event store database
        // Input: Comment ID
        // Output: Void
        server.route({
            method: 'POST',
            path: '/api/deleteComment',
            handler: async function (request, h) {
                try {
                    await commandModel.deleteComment(request);
                    return helper.goodResponse(h, null);
                } catch(err) {
                    return helper.badResponse(h, err);
                }
            }
        });

                
        //COMMENT QUERY FOR TESTING
        // server.route({
        //     method: 'GET',
        //     path: '/api/getBlob',
        //     handler: async function (request, h) {
        //         try {

        //             let query = await db.query(
        //                 'SELECT Content FROM EVENT'
        //             );
        //             query = JSON.stringify(query[0]);
        //             query = await JSON.parse(query);
        //             let content = JSON.parse(query['Content']);
        //             console.log(content);
        //             return helper.goodResponse(h, null);

                   
        //             //Call function for adding to current state database
        //         } catch(err) {
        //             return helper.badResponse(h, err);
        //         }
        //     }
        // });

    }
}


