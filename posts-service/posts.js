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
    }
};