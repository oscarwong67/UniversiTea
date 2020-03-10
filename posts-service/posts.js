'use strict';

const db = require('./db');

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
        }),
        
        server.route({
          method: 'POST',
          path: '/api/addPost/',
          handler: function (request, h) {
            try {
              let content = request.payload.content;
              let title = request.payload.title;
              let userId = request.payload.userId;
              let schoolId = request.payload.schoolId;
              const addPost = db.query(
                'INSERT INTO POSTS SET ?', 
                { Content: content, Title: title, User_ID: userId, School_ID: schoolId }
              );
              if (!addPost.affectedRows) { throw new Error('Unable add post'); }
              
            } catch (error) {
              console.log(error);
              return res.status(400).json({ success: false });
            }
          }
      });
    }
};