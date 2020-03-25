'use strict'
const db = require('./db');
const helper = require('./helper');
const notificationsMicroserviceHost = 'localhost:3003';
const fetch = require('node-fetch');

module.exports = [
  {
    method: 'GET',
    path: '/api/getNotifications',
    handler: async function (request, h) {
      try {
        const url = `http://${notificationsMicroserviceHost}${request.url.pathname}${request.url.search}`;
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        return data;
      } catch (err) {
        return helper.badResponse(h, err);
      }
    }
  },
  {
    method: 'POST',
    path: '/api/markNotificationsAsRead',
    handler: async function(request, h) {
      const url = `http://${notificationsMicroserviceHost}/api/markNotificationsAsRead`;
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(request.payload),
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return res;
    }
  }
]