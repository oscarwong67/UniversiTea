
const fetch = require('node-fetch');
const commentsMicroserviceHost = 'localhost:3002';

exports.plugin = {
  pkg: require('./package.json'),
  register: async function (server, options) {
    server.route({
      method: 'GET',
      path: '/api/getComment',
      async handler(request, h) {
        const url = `http://${commentsMicroserviceHost}${request.url.pathname}${request.url.search}`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
      },
    });

    server.route({
      method: 'POST',
      path: '/api/addComment',
      async handler(request, h) {
        const url = `http://${commentsMicroserviceHost}/api/addComment`;
        console.log(request.payload);
        const res = await fetch(url, {
          method: 'POST',
          // body: JSON.stringify(request.payload),
          body: request.payload,
          headers: { 'Content-Type': 'application/json' },
        })
        .then(
            function(response){
                response.json().then(function(data) {
                    const userID = data.User_ID; //User who made the new comment
                    const commentID = data.Comment_ID; //The new comment
                    const commentContent = data.Content;
                    const parentComments = [];
                    const parentUsers = [];
                    const parentCommentsContents = [];
                    const parentID = data.Parent_ID;

                    //While there is a parentID, find the id of the parent and the user who posted it
                    //An alternative to speed this up would be to put another function in the comment service 
                    //that returns a large list of everything necessary.
                    //This would reduce overhead of making an HTTP request for every nested comment.
                    while(parentID != null && parentID != 0){
                        parentComments.add(parentID);
                        const getParentURL = `http://${commentsMicroserviceHost}/api/getComment`;
                        const getParentRes = await fetch(url, {
                            method: 'GET',
                            body: {"Comment_ID" : parentID},
                            headers: { 'Content-Type': 'application/json' },
                        })
                        .then(function(response){
                            parentUsers.add(response.User_ID);
                            parentCommentsContents.add(resonse.Content);
                            parentID = response.Parent_ID;
                        });   
                    }

                    //Notify all users in the parentUsers list
                    //that their comment with id and contents (at same index in parentComments list)
                    //had a reply by userID saying commentContent
                });
            }
        );
        return res;
      }
    });
  },
};