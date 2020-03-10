
const Hapi = require('@hapi/hapi');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  await server.register([{
    plugin: require('./apiExample'),
    plugin: require('./posts')
  }]); // register the routes in apiExample.js

  const start = async function () {
    try {
      await server.register([
        { plugin: require('./apiExample'), options: {} },
        { plugin: require('./authentication'), options: {} },
        {
          plugin: require('hapi-cors'),
          options: {
            origins: ['http://localhost:8080']
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
