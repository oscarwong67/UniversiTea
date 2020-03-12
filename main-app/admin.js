exports.plugin = {
    pkg: require('./package.json'),
    register: async function (server, options) {
      server.route({
        method: 'POST',
        path: '/api/admin/promote',
        async handler(request, h) {
          const user = request.payload.email;
          
        },
      });

      server.route({
        method: 'POST',
        path: '/api/admin/deletePost',
        async handler(request, h) {
          
        },
      });

      server.route({
        method: 'POST',
        path: '/api/admin/deleteComment',
        async handler(request, h) {
          
        },
      });
    },
};
  