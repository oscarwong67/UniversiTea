require('dotenv').config();
const fetch = require('node-fetch');
const commentsMicroservice = process.env.COMMENTS_SERVICE;

module.exports = [
  {
    method: 'GET',
    path: '/api/getComments/',
    async handler(request, h) {
      const url = `${commentsMicroservice}${request.url.pathname}${request.url.search}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  },

  {
    method: 'POST',
    path: '/api/addComment',
    async handler(request, h) {
      const url = `${commentsMicroservice}/api/addComment`;
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(request.payload),
        headers: { 'Content-Type': 'application/json' },
      });
      return res;
    }
  },

  {
    method: 'POST',
    path: '/api/deleteComment',
    async handler(request, h) {
      const url = `${commentsMicroservice}/api/deleteComment`;
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(request.payload),
        headers: { 'Content-Type': 'application/json' },
      });
      return res;
    }
  },

  {
    method: 'POST',
    path: '/api/editComment',
    async handler(request, h) {
      const url = `${commentsMicroservice}/api/editComment`;
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(request.payload),
        headers: { 'Content-Type': 'application/json' },
      });
      return res;
    }
  },
];