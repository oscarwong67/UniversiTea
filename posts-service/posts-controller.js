'use strict';

const db = require('./db');
const helper = require('./helper');
const commentsMicroserviceHost = 'localhost:3002';

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
      server.route({
        method: 'GET',
        path: '/api/feed',
        handler: async function (request, h) {
            //Write Code Here
        }
      });
    }

    
  };