'use strict';

const helper = require('./helper');

const db = require('./db');

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
                    let commentID = request.payload.commentID;
                    let content = request.payload.content;
                    let userID = request.payload.userID;
                    let postID = request.payload.postID;
                    let parentID = request.payload.parentID
                    
                    let event = {
                        "Action" : "getComment",
                        "Comment_ID": commentID,
                        "Content" : content,
                        "User_ID" : userID,
                        "Post_ID" : postID,
                        "Parent_ID" : parentID == undefined ? null : parentID // CHANGE THIS TO MATCH THE DATABASE ORDER
                    };
                    
                    event = JSON.stringify(event);
                    await db.query(
                        'INSERT INTO EVENT SET ?',
                        { Content : event } // I dont know if this syntax is correct
                    );
                    return helper.goodResponse(h, null);
                    //Call function for adding to current state database
                } catch(err) {
                    return helper.badResponse(h, err);
                }
            }
        });
        
        //COMMENT QUERY FOR TESTING
        server.route({
            method: 'GET',
            path: '/api/getBlob',
            handler: async function (request, h) {
                try {
                
                    let query = await db.query(
                        'SELECT Content FROM EVENT'
                    );
                    query = JSON.stringify(query[0]);
                    query = await JSON.parse(query);
                    let content = JSON.parse(query['Content']);
                    console.log(content);
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
                    let commentID = request.payload.commentID;
                    let newContent = request.payload.newContent;
                    
                    let event = {
                        "Action": "editComment",
                        "Comment_ID": commentID,
                        "Content" : newContent,
                    };
                    await db.query(
                        'INSERT INTO EVENT SET ?',
                        { Content : event }
                    );
                    //Call function for adding to current state database
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
                    let commentID = request.payload.commentID;
                    
                    let event = {
                        "Action" : "deleteComment",
                        "Comment_ID": commentID,
                    };
                    await db.query(
                        'INSERT INTO EVENT SET ?',
                        { Content : event }
                    );
                    //Call function for adding to current state database
                    return helper.goodResponse(h, null);
                } catch(err) {
                    return helper.badResponse(h, err);
                }
            }
        });

    }
}