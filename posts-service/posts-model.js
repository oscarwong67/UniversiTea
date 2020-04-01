'use-strict';

const db = require('./db');

// Gets called by REST API to get feed
const getFeed = async (schoolID, search) => {
    let posts;
    if(search !== undefined) {
        posts = await db.query(`
            SELECT * 
            FROM POSTS AS P, SCHOOL AS S, USER AS U
            WHERE P.User_ID=U.User_ID AND P.School_ID=S.School_ID AND S.School_ID=?
                    AND P.Title LIKE ?
            ORDER BY Post_id DESC
            `, [schoolID, '%'+search+'%'])
    } else {
        posts = await db.query(`
            SELECT * 
            FROM POSTS AS P, SCHOOL AS S, USER AS U
            WHERE P.User_ID=U.User_ID AND P.School_ID=S.School_ID AND S.School_ID=?
            ORDER BY Post_id DESC
            `, schoolID)
    }
    if (!posts.length) throw new Error('Failed to get feed from db');
    return { posts };
}

// Gets called by REST API to add post
const addPost = async (content, title, user, school, mediaUrls, isAnonymous) => {
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
}

// Gets called by REST API to get Post
const getPost = async (postid) => {
    const post = await db.query(`
        SELECT P.*, S.SchoolName, S.School_ID, U.FName, U.User_ID, U.Degree_Type
        FROM POSTS AS P, USER AS U, SCHOOL AS S
        WHERE P.Post_ID=? AND P.User_ID=U.User_ID AND P.School_ID=S.School_ID
        `, [postid]
    );
    const media = await db.query(`
        SELECT Source_URL AS 'url', Type AS 'type', Media_ID AS 'id'
        FROM MEDIA
        WHERE Post_ID=?
        `, [postid]
    );
    return { post, media };
}

// Gets called by REST API to delete a post
const deletePost = async (postid) => {
    await db.query(`
        DELETE FROM POSTS
        WHERE Post_ID=?
        `, [postid]);
    await db.query(`
        DELETE FROM MEDIA
        WHERE Post_ID=?
        `, [postid]);
}

// Gets called by REST API to edit a post
const editPost = async (postid, content, title, mediaUrls, isAnonymous) => {
    const post = await db.query(
        `UPDATE POSTS
        SET ?
        WHERE Post_ID=?`,
        [{ Content: content, Title: title, Is_Anonymous: isAnonymous }, postid]
    )
    await db.query(`
        DELETE FROM MEDIA
        WHERE Post_ID=?
        `, [postid]);
    mediaUrls.forEach(async (mediaUrl) => {
        console.log('here');
        const mediaInsertResult = await db.query(
            'INSERT INTO MEDIA SET ?',
            { Source_Url: mediaUrl.url, Type: mediaUrl.type, Post_ID: postid }
        )
        if (!mediaInsertResult.insertId) throw new Error('Failed to insert media');
    });
}

module.exports = {getFeed, addPost, getPost, deletePost, editPost};