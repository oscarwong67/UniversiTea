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
        //add new school
        method: 'POST',
        path: '/api/admin/addSchool',
        handler: async function (request, h) {
            try {
                const schoolName = request.payload.schoolName;
                const addSchool = await db.query('INSERT INTO SCHOOL SET SchoolName=?', [schoolName]);
                return helper.goodResponse(h, { schoolID: addSchool.insertId });
            } catch(err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        // delete school and forum??
        method: 'POST',
        path: '/api/admin/deleteSchool',
        handler: async function (request, h) {
            try {
                return;
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        //edit school name
        method: 'POST',
        path: '/api/admin/editSchool',
        handler: async function (request, h) {
            try {
                const oldSchoolName = request.payload.schoolName;
                const newSchoolName = request.payload.newSchoolName;
                const updateSchoolName = await db.query('UPDATE SCHOOL SET SchoolName=? WHERE SchoolName=?', [newSchoolName, oldSchoolName]);
                if(!updateSchoolName.affectedRows) throw new Error('No school with name ${oldSchoolName} was found');
                return helper.goodResponse(h, newSchoolName);
            } catch (err) {
                return helper.badResponse(h, err);
            }
        }
    }
]