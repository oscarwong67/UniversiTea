
const fetch = require('node-fetch');
const postsMicroserviceHost = 'localhost:3001';

exports.plugin = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    server.route({
      method: 'GET',
      path: '/api/feed/',
      async handler(request, h) {
        // const url = `http://${postsMicroserviceHost}${request.url.pathname}${request.url.search}`;
        // console.log(url);
        // const res = await fetch(url);
        // const data = await res.json();
        // return data;
        return h.redirect(`http://${postsMicroserviceHost}${request.url.pathname}${request.url.search}`);
      },
    });

    server.route({
      method: 'POST',
      path: '/api/addPost',
      async handler(request, h) {
        const url = `http://${postsMicroserviceHost}/api/addPost`;
        const res = await fetch(url, {
          method: 'POST',
          body: request.payload,
          headers: { 'Content-Type': 'application/json' },
        });
        return res;
      }
    });

    server.route({
      method: 'GET',
      path: '/api/getPost/',
      async handler(request, h) {
        const url = `http://${postsMicroserviceHost}${request.url.pathname}${request.url.search}`;
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        return data;
      },
    });
  },
};
