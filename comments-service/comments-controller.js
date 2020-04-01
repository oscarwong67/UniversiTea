'use strict';

const helper = require('./helper');
const commandModel = require('./command-model');
const queryModel = require('./query-model');
const notificationController = require('./notifications-controller');

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
          let parentID = request.payload.parentID == undefined ? null : request.payload.parentID;
          let isAnon = request.payload.isAnon; 
          await commandModel.addComment(commentID, content, userID, postID, parentID, isAnon);
          const commentId = await queryModel.addComment();
          // no await - if notifications doesn't work, comment should still be posted
          notificationController.addNotificationForComment(commentId);
          return helper.goodResponse(h, null);
        } catch (err) {
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
          let isAnon = request.payload.isAnon;
          let newContent = request.payload.newContent;   
          await commandModel.editComment(commentID, isAnon, newContent);
          await queryModel.editComment();
          return helper.goodResponse(h, null);
        } catch (err) {
          return helper.badResponse(h, err);
        }
      }
    });

    // deleting a comment in the event store database
    // Input: Comment ID
    // Output: Void
    server.route({
      method: 'POST',
      path: '/api/deleteComment',
      handler: async function (request, h) {
        try {
          let commentID = request.payload.commentID;
          await commandModel.deleteComment(commentID);
          await queryModel.deleteComment();
          return helper.goodResponse(h, null);
        } catch (err) {
          return helper.badResponse(h, err);
        }
      }
    });

    // Getting comments from the current state of comments table
    // Input: Post ID
    // Output: Comments of a Post
    server.route({
      method: 'GET',
      path: '/api/getComments/',
      handler: async function (request, h) {
        try {
          let postID = request.query.postID;
          let parentID = request.query.parentID;
          const result = await queryModel.getComments(postID, parentID);
          return { ...result };
        } catch (err) {
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
