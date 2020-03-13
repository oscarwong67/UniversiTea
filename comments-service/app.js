'use strict'
const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3002,
        host: 'localhost'
    });

    await server.register(require('./comments-controller')); // register the routes in posts.js

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();