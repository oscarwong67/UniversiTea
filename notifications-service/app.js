'use strict'
require('dotenv').config();
const Hapi = require('@hapi/hapi');

const init = async () => {

  const server = Hapi.server({
    port: 3003,
    host: 'localhost'
  });

  await server.register(require('./notifications-controller')); // register the routes in notifications.js

  const start = async function () {
    try {
      await server.register([
        {
          plugin: require('hapi-cors'),
          options: {
            origins: [process.env.MAIN_APP, process.env.COMMENTS_SERVICE]
          }
        }
      ]);

      await server.start();
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  await start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();