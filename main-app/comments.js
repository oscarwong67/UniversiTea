
const fetch = require('node-fetch');
const notificationsMicroserviceHost = 'localhost:3003';
const commentsMicroserviceHost = 'localhost:3002';
const postsMicroserviceHost = 'localhost:3001';

exports.plugin = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    server.route({
      method: 'GET',
      path: '/api/getComment',
      async handler(request, h) {
        const url = `http://${commentsMicroserviceHost}${request.url.pathname}${request.url.search}`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
      },
    });

    server.route({
      method: 'POST',
      path: '/api/addComment',
      async handler(request, h) {
        const url = `http://${commentsMicroserviceHost}/api/addComment`;
        const res = await fetch(url, {
          method: 'POST',
          body: request.payload,
          headers: { 'Content-Type': 'application/json' },
        });
        return res;
      }
    });
  },
};