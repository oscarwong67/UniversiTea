require('dotenv').config();

const notificationsMicroservice = process.env.NOTIFICATIONS_MICROSERVICE;
const fetch = require('node-fetch');

const addNotificationForComment = async (commentId) => {
  const url = `${notificationsMicroservice}/api/addNotificationsForComment`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ commentId }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res;
  } catch(err) {
    return err;
  }
}


module.exports = { addNotificationForComment }