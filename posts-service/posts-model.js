'use-strict';

const db = require('./db');
const helper = require('./helper');

const getFeed = async (request) => {
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
}

const addPost = async (request) => {
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
}

module.exports = {getFeed, addPost};