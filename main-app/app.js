const Hapi = require('@hapi/hapi');
const Path = require('path');

const init = async () => {
  const server = Hapi.server({
    port: 80,
    host: '0.0.0.0',
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '../frontend/dist')
      }
    }
  });

  server.state('session', {
    ttl: 1000 * 60 * 60,
    encoding: 'base64json'
  });

  await server.register(require('@hapi/inert'));

  const start = async function () {

    try {
      await server.register([
        {
          plugin: require('hapi-cors'),
        },
        {
          plugin: require('hapi-auth-cookie'),
          options: {}
        },
      ]);

      server.route(require('./routes'));


      server.ext('onPreResponse', (request, h) => {
        const response = request.response;
        if (response.isBoom &&
          response.output.statusCode === 404) {
          return h.file('index.html');
        }

        return h.continue;
      });

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
