'use-strict';
require('dotenv').config();
const commentsModel = require('./comments-model');

exports.plugin = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    
    server.route({
      method: 'GET',
      path: '/api/getComments/',
      async handler(request, h) {
        const data = await commentsModel.getComments(request);
        return data;
      },
    });

    server.route({
      method: 'POST',
      path: '/api/addComment',
      async handler(request, h) {
        const res = await commentsModel.addComment(request);
        return res;
      },
    });

    server.route({
      method: 'POST',
      path: '/api/deleteComment',
      async handler(request, h) {
        const res = await commentsModel.deleteComment(request);
        return res;
      },
    });

    server.route({
      method: 'POST',
      path: '/api/editComment',
      async handler(request, h) {
        const res = await commentsModel.editComment(request);
        return res;
      },
    });
  }
}