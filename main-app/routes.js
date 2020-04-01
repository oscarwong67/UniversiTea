const posts = require('./posts');
const authentication = require('./authentication-controller');
const admin = require('./admin-controller');
const school = require('./school-controller');
const notifications = require('./notifications');
const comments = require('./comments');
const frontend = require('./frontend');

module.exports = [].concat(posts, authentication, admin, school, notifications, comments, frontend);