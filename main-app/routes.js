const posts = require('./posts');
const authentication = require('./authentication');
const admin = require('./admin');
const school = require('./school');

module.exports = [].concat(posts, authentication, admin, school);