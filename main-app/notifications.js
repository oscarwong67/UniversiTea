'use strict'
require('dotenv').config();
const db = require('./db');
const helper = require('./helper');
const notificationsMicroservice = process.env.NOTIFICATIONS_SERVICE;
const fetch = require('node-fetch');

module.exports = [
  {
    method: 'GET',
    path: '/api/getNotifications',
    handler: async function (request, h) {
      try {
        const url = `${notificationsMicroservice}${request.url.pathname}${request.url.search}`;
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
      const url = `${notificationsMicroservice}/api/markNotificationsAsRead`;
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