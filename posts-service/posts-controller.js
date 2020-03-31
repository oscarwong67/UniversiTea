'use strict';

const db = require('./db');
const helper = require('./helper');
const postsModel = require('./posts-model');
const commentsMicroserviceHost = 'localhost:3002';

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
      server.route({
        method: 'GET',
        path: '/api/feed',
        handler: async function (request, h) {
            try {
                const posts = postsModel.getFeed(request);
                return { ...posts };
            } catch(err) {
                return helper.badResponse(h, err);
            }
        }
      });

      server.route({
        method: 'POST',
        path: '/api/addPost',
        handler: async function (request, h) {
          try {
                
            return helper.goodResponse(h);
          } catch (err) {
            return helper.badResponse(h, err);
          }
        }
      });


    }
  };