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
        path: '/api/feed',
        handler: async function (request, h) {
            try {
                const posts = await postsModel.getFeed(request);
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
          try {
            await postsModel.addPost(request);
            return helper.goodResponse(h);
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
            const result = await postsModel.getPost(request);
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
            await postsModel.deletePost(request);
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
          console.log(request.payload);
          try {
            await postsModel.editPost(request);
            return helper.goodResponse(h);
          } catch (err) {
            return helper.badResponse(h, err);
          }
        }
      });

    }
  };