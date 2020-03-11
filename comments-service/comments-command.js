'use strict';

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
                    let parentID = request.payload.parentID
                    
                    let event = {
                        "addComment" : {
                            "Comment_ID": commentID,
                            "Content" : content,
                            "User_ID" : userID,
                            "Post_ID" : postID,
                            "Parent_ID" : parentID // CHANGE THIS TO MATCH THE DATABASE ORDER
                        }
                    };
                    db.query(
                        'INSERT INTO EVENT SET ?',
                        { Content : event } // I dont know if this syntax is correct
                    );
                    //Call function for adding to current state database
                } catch(err) {

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
                        "editComment" : {
                            "Comment_ID": commentID,
                            "Content" : newContent,
                        }
                    };
                    db.query(
                        'INSERT INTO EVENT SET ?',
                        { Content : event }
                    );
                    //Call function for adding to current state database
                } catch(err) {

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
                        "deleteComment" : {
                            "Comment_ID": commentID,
                        }
                    };
                    db.query(
                        'INSERT INTO EVENT SET ?',
                        { Content : event }
                    );
                    //Call function for adding to current state database
                } catch(err) {

                }
            }
        });

    }
}