'use strict';

const helper = require('./helper');
const notificationsModel = require('./notifications-model');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/api/getNotifications',
            handler: async function (request, h) {
                let userId = request.query.userId;
                let limit = parseInt(request.query.limit) || 25;
                try {
                    const notifications = await notificationsModel.getNotifications(userId, limit);     
                    return helper.goodResponse(h, notifications);
                } catch(err) {
                    console.log(err);
                    return helper.badResponse(h, err);
                }
            }
        });


        server.route({
          method: 'POST',
          path: '/api/addNotificationsForComment',
          handler: async function (request, h) {
            try {
              let { commentId } = request.payload;
              await notificationsModel.addNotificationsForComment(commentId);
              return helper.goodResponse(h);
            } catch (err) {
              return helper.badResponse(h, err);
            }
          }
      });

      server.route({
        method: 'POST',
        path: '/api/markNotificationsAsRead',
        handler: async function (request, h) {
          try {
            let { userId } = request.payload;
            await notificationsModel.markNotificationsAsRead(userId);
            return helper.goodResponse(h);
          } catch(err) {
            return helper.badResponse(h, err);
          }
        }
      })
    }
};