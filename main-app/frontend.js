const Path = require('path');

module.exports = [
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname, '../frontend/dist'),
        redirectToSlash: true
      }
    }
  }
]
