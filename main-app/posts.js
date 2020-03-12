
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
        const res = await fetch(url);
        const data = await res.json();
        return data;
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
      }
    });

    server.route({
      method: 'POST',
      path: '/api/uploadMedia',
      async handler(request, h) {
        const url = `http://${postsMicroserviceHost}/api/uploadMedia`;
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
        }
      },
    });
  },
};
