require('dotenv').config();
const fetch = require('node-fetch');
const postsMicroservice = process.env.POSTS_SERVICE;

module.exports = [

  {
    method: 'POST',
    path: '/api/uploadMedia',
    async handler(request, h) {
      const url = `${postsMicroservice}/api/uploadMedia`;
      const res = await fetch(url, {
        method: 'POST',
        body: request.payload,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res;
    },
    options: {
      payload: {
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data',
          maxBytes: 2 * 1000 * 1000,
          timeout: false,
      },
    },
  },

  {
    method: 'GET',
    path: '/api/feed/',
    async handler(request, h) {
      const url = `${postsMicroservice}${request.url.pathname}${request.url.search}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  },

  {
    method: 'POST',
    path: '/api/addPost/',
    async handler(request, h) {
      const url = `${postsMicroservice}/api/addPost`;
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(request.payload),
        headers: { 'Content-Type': 'application/json' },
      });
      return res;
    },
  },

  {
    method: 'GET',
    path: '/api/getPost/',
    async handler(request, h) {
      const url = `${postsMicroservice}${request.url.pathname}${request.url.search}`;
      const res = await fetch(url);
      const data = await res.json();
      // console.log(data);
      return data;
    },
  },

  {
    method: 'POST',
    path: '/api/deletePost/',
    async handler(request, h) {
      const url = `${postsMicroservice}/api/deletePost/`;
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(request.payload),
        headers: { 'Content-Type': 'application/json' },
      });
      return res;
    },
  },

  {
    method: 'POST',
    path: '/api/editPost/',
    async handler(request, h) {
      console.log(request.payload);
      const url = `${postsMicroservice}/api/editPost/`;
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(request.payload),
        headers: { 'Content-Type': 'application/json' },
      });
      return res;
    }
  },
];