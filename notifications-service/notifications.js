'use strict';

const db = require('./db');
const helper = require('./helper');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        server.route({
          method: 'POST',
          path: '/api/addNotification',
          handler: async function (request, h) {
            try {
              let comment = request.payload.Comment_ID;
              let user = request.payload.User_ID;
              const notificationResult = await db.query(
                'INSERT INTO NOTIFICATION SET ?', 
                { User_ID: user, Comment_ID: comment }
              );
              if (!notificationResult.insertId) throw new Error('Failed to insert notification');
              return helper.goodResponse(notificationResult.values[0]);
            } catch (err) {
              return helper.badResponse(h, err);
            }
          }
      });

      server.route({
        method: 'POST',
        path: '/api/addReceiveNotification',
        handler: async function (request, h) {
          try {
            let notification = request.payload.Notification_ID;
            let user = request.payload.User_ID;
            const notificationResult = await db.query(
              'INSERT INTO RECEIVE_NOTIFICATION SET ?', 
              { User_ID: user, Notification_ID: notification }
            );
            if (!notificationResult.insertId) throw new Error('Failed to insert notification');
            return helper.goodResponse(h);
          } catch (err) {
            return helper.badResponse(h, err);
          }
        }
    });
    }
};