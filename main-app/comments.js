
const fetch = require('node-fetch');
const notificationsMicroserviceHost = 'localhost:3003';
const commentsMicroserviceHost = 'localhost:3002';
const postsMicroserviceHost = 'localhost:3001';

module.exports = [
  {
    method: 'GET',
    path: '/api/getComments/',
    async handler(request, h) {
      const url = `http://${commentsMicroserviceHost}${request.url.pathname}${request.url.search}`;
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  },

  {
    method: 'POST',
    path: '/api/addComment',
    async handler(request, h) {
      const url = `http://${commentsMicroserviceHost}/api/addComment`;
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(request.payload),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(res);
      return res;
    }
  },
];