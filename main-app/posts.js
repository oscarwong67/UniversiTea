
const fetch = require('node-fetch');
const postsMicroserviceHost = 'localhost:3001';

exports.plugin = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    server.route({
      method: 'GET',
      path: '/api/feed/',
      async handler(request, h) {
        const url = `http://${postsMicroserviceHost}${request.url.pathname}${request.url.search}`;
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        return data;
      },
    }),

    server.route({
      method: 'POST',
      path: '/api/addPost',
      async handler(request, h) {
        const url = `http://${postsMicroserviceHost}${request.url.pathname}`;
        console.log(url);
        const res = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({...request.payload}),
        });
      }
    });
  },
};
