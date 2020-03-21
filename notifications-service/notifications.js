'use strict';

const db = require('./db');
const helper = require('./helper');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/api/getNotifications/',
            handler: async function (request, h) {
                let notification_id = request.payload.Notification_ID;
                try {
                    const notifications = await db.query(`
                    SELECT * 
                    FROM NOTIFICATION
                    WHERE Notification_ID = ?`, [notification_id]);
                    return { notifications };
                } catch(err) {
                    console.log(err);
                }
            }
        });

        server.route({
            method: 'GET',
            path: '/api/getReceiveNotificationByUser/',
            handler: async function (request, h) {
                let user_id = request.payload.User_ID;
                try {
                    const receive_notifications = await db.query(`
                    SELECT * 
                    FROM RECEIVE_NOTIFICATION
                    WHERE User_ID = ?`, [user_id]);
                    return { receive_notifications };
                } catch(err) {
                    console.log(err);
                }
            }
        });

        server.route({
            method: 'GET',
            path: '/api/getReceiveNotificationByNotification/',
            handler: async function (request, h) {
                let notification_id = request.payload.Notification_ID;
                try {
                    const receive_notifications = await db.query(`
                    SELECT * 
                    FROM RECEIVE_NOTIFICATION
                    WHERE Notification_ID = ?`, [notification_id]);
                    return { receive_notifications };
                } catch(err) {
                    console.log(err);
                }
            }
        });


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