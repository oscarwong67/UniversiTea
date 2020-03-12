
const fetch = require('node-fetch');
const commentsMicroserviceHost = 'localhost:3002';

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
        console.log(request.payload);
        const res = await fetch(url, {
          method: 'POST',
          // body: JSON.stringify(request.payload),
          body: request.payload,
          headers: { 'Content-Type': 'application/json' },
        })
        .then(
            //API should return the User_ID of the comment. When this is recieved
            //send a notificaiton to the appropriate user
        );
        return res;
      }
    });
  },
};