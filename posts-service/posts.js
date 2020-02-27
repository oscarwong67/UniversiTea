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
                        SELECT * FROM POSTS 
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
          path: '/api/addPost/',
          handler: function (request, h) {
            try {
              let content = request.body.content;
              let title = request.body.title;
              let userId = request.body.userId;
              let schoolId = request.body.schoolId;
              const addPost = await db.query(
                'INSERT INTO POSTS SET ?', 
                { Content: content, Title: title, User_ID: userId, School_ID: schoolId }
              );
              if (!addPost.affectedRows) { throw new Error('Unable add post'); }
              res.status(200).json({ success: true });
            } catch (error) {
              console.log(error);
              res.status(400).json({ success: false });
            }
              // do i need this???
              return `Hello ${request.payload.name}, you've sent a POST request!`
          }
      });
    }
};