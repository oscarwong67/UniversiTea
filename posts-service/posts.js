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
          const schoolID = parseInt(request.query.schoolID) || true;
          if (page < 1) page = 1;
          const posts = await db.query(`
              SELECT * 
              FROM POSTS AS P, SCHOOL AS S, USER AS U
              WHERE P.User_ID=U.User_ID AND P.School_ID=S.School_ID AND S.School_ID=?
              ORDER BY Post_id
              LIMIT ${(page - 1) * limit}, ${limit}
          `, schoolID)
          return { posts };
        } catch (err) {
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
          let isAnonymous = request.payload.isAnonymous;
          const postResult = await db.query(
            'INSERT INTO POSTS SET ?',
            { Content: content, Title: title, User_ID: user, School_ID: school, Is_Anonymous: isAnonymous }
          );
          if (!postResult.insertId) throw new Error('Failed to insert post');
          mediaUrls.forEach(async (mediaUrl) => {
            const mediaInsertResult = await db.query(
              'INSERT INTO MEDIA SET ?',
              { Source_Url: mediaUrl.url, Type: mediaUrl.type, Post_ID: postResult.insertId }
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
      method: 'GET',
      path: '/api/getPost/',
      handler: async function (request, h) {
        try {
          let postid = parseInt(request.query.postid);
          console.log(postid);
          const post = await db.query(`
              SELECT P.*, S.SchoolName, S.School_ID, U.FName, U.User_ID, U.Degree_Type
              FROM POSTS AS P, USER AS U, SCHOOL AS S
              WHERE P.Post_ID=${ postid} AND P.User_ID=U.User_ID AND P.School_ID=S.School_ID
            `, {Post_ID:postid}
          );
          const media = await db.query(`
              SELECT Source_URL AS 'url', Type AS 'type', Media_ID AS 'id'
              FROM MEDIA
              WHERE ?
            `, {Post_ID:postid}
          );
          console.log(post);
          return helper.goodResponse, { post, media };
        } catch (err) {
          return helper.badResponse(h, err);
        }
      }
    });

    server.route({
      method: 'POST',
      path: '/api/deletePost/',
      handler: async function (request, h) {
        try {
          let postid = request.payload.postid;
          await db.query(`
              DELETE FROM POSTS
              WHERE Post_ID=${ postid}
            `);
          await db.query(`
              DELETE FROM MEDIA
              WHERE Post_ID=${ postid}
            `);
          return helper.goodResponse(h);
        } catch (err) {
          return helper.badResponse(h, err);
        }
      }
    });

    // TODO: fix this after anon posts are fixed
    server.route({
      method: 'POST',
      path: '/api/editPost/',
      handler: async function (request, h) {
        console.log(request.payload);
        try {
          let postid = request.payload.postid;
          let content = request.payload.content;
          let title = request.payload.title;
          let mediaUrls = request.payload.mediaUrls;
          let isAnonymous = request.payload.isAnonymous;
          const post = await db.query(
            `UPDATE POSTS
              SET ?
              WHERE Post_ID=${ postid}`,
            { Content: content, Title: title, Is_Anonymous: isAnonymous }
          )
          await db.query(`
              DELETE FROM MEDIA
              WHERE Post_ID=${ postid}
            `);
          mediaUrls.forEach(async (mediaUrl) => {
            console.log('here');
            const mediaInsertResult = await db.query(
              'INSERT INTO MEDIA SET ?',
              { Source_Url: mediaUrl.url, Type: mediaUrl.type, Post_ID: postid }
            )
            if (!mediaInsertResult.insertId) throw new Error('Failed to insert media');
          });
          return helper.goodResponse(h);
        } catch (err) {
          return helper.badResponse(h, err);
        }
      }
    })
  }
};