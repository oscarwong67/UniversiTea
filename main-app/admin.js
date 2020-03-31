'use strict';
const db = require('./db');
const helper = require('./helper');

module.exports = [
    {
        //promote user to admin status
        method: 'POST',
        path: '/api/admin/promote',
        handler: async function (request, h) {
            try {
                const { userId } = request.payload;
                const userToAdmin = await db.query('UPDATE USER SET Is_Admin=1 WHERE User_ID=?', [userId]);
                if (!userToAdmin.affectedRows) throw new Error('Error setting ${userId} to admin');
                return helper.goodResponse(h);
            } catch(err) {
                return helper.badResponse(h, err);
            }
        }
    },
    {
        method: 'GET',
        path: '/api/admin/getusers',
        handler: async function (request, h) {
            try {
                const users = await db.query('SELECT * FROM USER');
                if (!users.length) throw new Error('Unable to fetch users from database.');
                return helper.goodResponse(h, users);
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
                return helper.goodResponse(h, { School_ID: addSchool.insertId });
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
                const { schoolId } = request.payload;
                const res = await db.query('DELETE FROM SCHOOL WHERE School_ID=?', [schoolId]);
                if (!res.affectedRows) throw new Error(`Unable to delete school with ID: ${schoolId}`);
                return helper.goodResponse(h);
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