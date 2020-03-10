'use strict';

const db = require('./db');

exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
        // Example:
        // server.route({
        //     method: 'GET',
        //     path: '/api/feed/',
        //     handler: async function (request, h) {
        //         try {
        //             let page = parseInt(request.query.page) || 1;
        //             const limit = parseInt(request.query.limit) || 9;
        //             if (page < 1) page = 1;
        //             const posts = await db.query(`
        //                 SELECT * 
        //                 FROM POSTS AS P, SCHOOL AS S, USER AS U
        //                 WHERE P.User_ID=U.User_ID AND P.School_ID=S.School_ID
        //                 ORDER BY Post_id
        //                 LIMIT ${(page - 1) * limit}, ${limit}
        //             `)
        //             return { posts };
        //         } catch(err) {
        //             console.log(err);
        //             // TODO: put in julian's error thing
        //         }
        //     }
        // });

        server.route({
            method: 'POST',
            path: '/api/addComment',
            handler: async function (request, h) {
                try {
                    let commentID = request.payload.commentID;
                    let content = request.payload.content;
                    let userID = request.payload.userID;
                    let parentID = request.payload.parentID
                    
                    let event = {
                        "addComment" : {
                            "Comment_ID": commentID,
                            "Content" : content,
                            "User_ID" : userID,
                            "Post_ID" : postID,
                            "Parent_ID" : parentID // CHANGE THIS TO MATCH THE DATABASE ORDER
                        }
                    };
                    db.query(event);
                } catch(err) {

                }
            }
        });

    }
}