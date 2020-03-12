'use strict'
const db = require('./db');
const helper = require('./helper');

module.exports = [
    {
        //promote user to admin status
        method: 'POST',
        path: '/api/admin/promote',
        handler: async function (request, h) {
            try {
            const user = request.payload.email;
            const userToAdmin = await db.query('UPDATE USER SET Admin=1 WHERE Email=?', [user]);
            if (!userToAdmin.affectedRows) throw new Error('Error setting ${user} to admin');
            return helper.goodResponse(h, user);
            } catch(err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        //delete post
        method: 'POST',
        path: '/api/admin/deletePost',
        handler: async function (request, h) {
            
        }
    },
    {
        //delete comment
        method: 'POST',
        path: '/api/admin/deleteComment',
        handler: async function (request, h) {
            
        }
    }
]