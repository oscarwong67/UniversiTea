
const fetch = require('node-fetch');
const notificationsMicroserviceHost = 'localhost:3003';
const commentsMicroserviceHost = 'localhost:3002';
const postsMicroserviceHost = 'localhost:3001';

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
          body: request.payload,
          headers: { 'Content-Type': 'application/json' },
        })
        .then(
            function(response){
                response.json().then(function(data) {
                    const userID = data.User_ID; //User who made the new comment
                    const commentID = data.Comment_ID; //The new comment ID
                    const postID = data.postID; //The id of the first post in the thread
                    const parentID = data.Parent_ID; //The id of the parent comment if in 
                                                     //a nested thread


                    //We need to create a notification object in the DB and return the Notification_ID
                    const url = `http://${notificationsMicroserviceHost}/api/addNotification`;
                    console.log(request.payload);
                    const res = await fetch(url, {
                      method: 'POST',
                      body: {"Comment_ID":commentID, "User_ID":userID},
                      headers: { 'Content-Type': 'application/json' },
                    })

                    //This API call should use the Post_ID JSON field to query posts for the user ids, then
                    //use the Notification_ID and User_IDs to add appropriate rows to the 
                    //RECEIVE_NOTIFICATION table
                    .then(
                      response.json().then(function(data){
                        const notificationID = data.Notification_ID;
                        const url = `http://${postsMicroserviceHost}/api/addReceiveNotification`;
                        console.log(request.payload);
                        const res = await fetch(url, {
                          method: 'POST',
                          body: {"Receive_Notifications":{"original_post":{"Notification_ID":notificationID, "Post_ID":postID},"comment":{"Notification_ID":notificationID, "Post_ID":parentID}}},
                          headers: { 'Content-Type': 'application/json' },
                        })
                      })
                    )
                });
            }
        );
        return res;
      }
    });
  },
};