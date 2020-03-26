const notificationsMicroserviceHost = 'http://localhost:3003';
const fetch = require('node-fetch');

const addNotificationForComment = async (commentId) => {
  const url = `${notificationsMicroserviceHost}/api/addNotificationsForComment`;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ commentId }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return res;
}


module.exports = { addNotificationForComment }