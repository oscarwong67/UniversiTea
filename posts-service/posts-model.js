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

module.exports = {getFeed};