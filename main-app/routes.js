const posts = require('./posts');
const authentication = require('./authentication');
const admin = require('./admin');
const school = require('./school');
const notifications = require('./notifications');
const comments = require('./comments');
const frontend = require('./frontend');

module.exports = [].concat(posts, authentication, admin, school, notifications, comments, frontend);