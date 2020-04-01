'use strict';

const helper = require('./helper');
const postsModel = require('./posts-model');

exports.plugin = {
  pkg: require('./package.json'), 
  register: async function (server, options) {

  // API call for getting feed
      // Input: page, limit, schoolID
    server.route({
      method: 'GET',
      path: '/api/feed/',
      handler: async function (request, h) {
          const schoolID = parseInt(request.query.schoolID) || true;
          const search = request.query.search;
            try {
                const posts = await postsModel.getFeed(schoolID, search);
                return { ...posts };
            } catch(err) {
                return helper.badResponse(h, err);
            }
        }
      });

      // API call for adding a post
      // Input: content, title, user, school, mediaUrls, isAnonymous
      server.route({
        method: 'POST',
        path: '/api/addPost',
        handler: async function (request, h) {
          let content = request.payload.content;
          let title = request.payload.title;
          let user = request.payload.user;
          let school = request.payload.school;
          let mediaUrls = request.payload.mediaUrls;
          let isAnonymous = request.payload.isAnonymous;
          try {
            const res = await postsModel.addPost(content, title, user, school, mediaUrls, isAnonymous);
            return helper.goodResponse(h, res);
          } catch (err) {
            return helper.badResponse(h, err);
          }
        }
      });

      // API call for getting a post
      // Input: postid
      server.route({
        method: 'GET',
        path: '/api/getPost/',
        handler: async function (request, h) {
          try {
            let postid = parseInt(request.query.postid);
            const result = await postsModel.getPost(postid);
            return helper.goodResponse, result;
          } catch (err) {
            return helper.badResponse(h, err);
          }
        }
      });

      // API call for deleting a post
      // Input: postid
      server.route({
        method: 'POST',
        path: '/api/deletePost/',
        handler: async function (request, h) {
          try {
            let postid = request.payload.postid;
            await postsModel.deletePost(postid);
            return helper.goodResponse(h);
          } catch (err) {
            return helper.badResponse(h, err);
          }
        }
      });

      // API call for editing a post
      // Input: postid, content, title, user, school, mediaUrls, isAnonymous
      server.route({
        method: 'POST',
        path: '/api/editPost/',
        handler: async function (request, h) {
          try {
            let postid = request.payload.postid;
            let content = request.payload.content;
            let title = request.payload.title;
            let mediaUrls = request.payload.mediaUrls;
            let isAnonymous = request.payload.isAnonymous;
            await postsModel.editPost(postid, content, title, mediaUrls, isAnonymous);
            return helper.goodResponse(h);
          } catch (err) {
            return helper.badResponse(h, err);
          }
        }
      });

    }
  };