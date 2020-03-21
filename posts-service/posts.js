'use strict';

const db = require('./db');
const helper = require('./helper');
const commentsMicroserviceHost = 'localhost:3002';
const notificationsMicroserviceHost = 'localhost:3003';

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/api/feed/',
            handler: async function (request, h) {
                try {
                    let page = parseInt(request.query.page) || 1;
                    const limit = parseInt(request.query.limit) || 9;
                    if (page < 1) page = 1;
                    const posts = await db.query(`
                        SELECT * 
                        FROM POSTS AS P, SCHOOL AS S, USER AS U
                        WHERE P.User_ID=U.User_ID AND P.School_ID=S.School_ID
                        ORDER BY Post_id
                        LIMIT ${(page - 1) * limit}, ${limit}
                    `)
                    return { posts };
                } catch(err) {
                    console.log(err);
                    // TODO: put in julian's error thing
                }
            }
        });
        
        server.route({
          method: 'POST',
          path: '/api/addPost',
          handler: async function (request, h) {
            try {
              let content = request.payload.content;
              let title = request.payload.title;
              let user = request.payload.user;
              let school = request.payload.school;
              let mediaUrls = request.payload.mediaUrls;
              const postResult = await db.query(
                'INSERT INTO POSTS SET ?', 
                { Content: content, Title: title, User_ID: user, School_ID: school }
              );
              if (!postResult.insertId) throw new Error('Failed to insert post');
              mediaUrls.forEach(async (mediaUrl) => {
                const mediaInsertResult = await db.query(
                  'INSERT INTO MEDIA SET ?',
                  {Source_Url: mediaUrl.url, Type: mediaUrl.type, Post_ID: postResult.insertId}
                )
                if (!mediaInsertResult.insertId) throw new Error('Failed to insert media');
              });
              return helper.goodResponse(h);
            } catch (err) {
              return helper.badResponse(h, err);
            }
          }
      });

      server.route({
        method:'POST',
        path: '/api/addReceiveNotification',
        handler: async function (request, h){
          const comments_url = `http://${commentsMicroserviceHost}/api/getComment`;
          const notifications_url = `http://${notificationsMicroserviceHost}/api/addReceiveNotification`;
          try{
              let original_post = request.payload.original_post;
              let comment = request.payload.comment;

              //Query to find Post_User_ID
              const posts = await db.query(`
              SELECT * 
              FROM POSTS
              WHERE Posts_ID = ?`, [original_post.Post_ID]);

              let post_user_id = posts[0].User_ID;
              
              //API call to comments service to find Comment_User_ID
              const res = await fetch(comments_url, {
                method: 'GET',
                body: {"Comment_ID":commentID},
                headers: { 'Content-Type': 'application/json' },
              })
              let comment_user_id = res[0].User_ID;

              //API call to notifications service to insert receive notifications rows
              const res2 = await fetch(notifications_url, {
                method: 'POST',
                body: {"Notification_ID":original_post.notificationID, "User_ID":post_user_id},
                headers: { 'Content-Type': 'application/json' },
              })

              const res3 = await fetch(notifications_url, {
                method: 'POST',
                body: {"Notification_ID":comment.notificationID, "User_ID":comment_user_id},
                headers: { 'Content-Type': 'application/json' },
              })
              return helper.goodResponse(h);
          }
          catch(err){
            return helper.badResponse(h, err);
          }
        }
      });
    }
};