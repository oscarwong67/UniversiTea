'use-strict';

const commentsModel = require('./comments-model');

module.exports = [
    {      
      method: 'GET',
      path: '/api/getComments/',
      handler: async function (request, h) {
        const data = await commentsModel.getComments(request);
        return data;
      }
    },
    {
      method: 'POST',
      path: '/api/addComment',
      handler: async function (request, h) {
        const res = await commentsModel.addComment(request);
        return res;
      }
    },
    {
      method: 'POST',
      path: '/api/deleteComment',
      handler: async function (request, h) {
        const res = await commentsModel.deleteComment(request);
        return res;
      }
    },
    {
      method: 'POST',
      path: '/api/editComment',
      handler: async function (request, h) {
        const res = await commentsModel.editComment(request);
        return res;
      }
    },
]