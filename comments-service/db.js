'use strict'

// this file connects to the database
const util = require('util');
const mysql = require('mysql');

console.log('Initializing database connection...');
// this is the connection to the test DB on Jeremy's server
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '107.180.50.225',
    user: 'admin3',
    password: 'joshua747',
    database: 'seng401',
    charset: 'utf8mb4',
    debug: false
});

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) connection.release()

    return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool;