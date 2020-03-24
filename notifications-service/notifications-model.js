const db = require('./db');

const getNotifications = async (userId, limit) => {
  const notifications = await db.query(
    'SELECT N.Comment_ID, N.Notification_ID, N.Is_Read, P.Post_ID, P.Title, C.Timestamp, C.Parent_ID ' +
    'FROM NOTIFICATION AS N, POSTS AS P, COMMENT AS C ' +
    'WHERE N.User_ID = ? AND N.Comment_ID=C.Comment_ID AND C.Post_ID=P.Post_ID LIMIT ?', [userId, limit]);
  
    notifications.forEach((notification) => {
      const timestamp = new Date(Date.parse(notification.Timestamp));
      const current = new Date();
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const ageInDays = Math.round((current - timestamp) / oneDay);
      let ageString = '';
      if (ageInDays === 0) {
        ageString = 'today';
      } else if (ageInDays === '1') {
        ageString = '1 day ago';
      } else {
        ageString = `${ageInDays} days ago`
      }
    });

    return notifications;
}

const addNotificationsForComment = async(commentId) => {
  // get original poster's id
  let commentParentPostAndCommentInfo = await db.query(
    'SELECT P.User_ID, C.Parent_ID ' +
    'FROM POSTS AS P, COMMENT AS C ' +
    'WHERE P.Post_ID=C.Post_ID AND C.Comment_ID=?', [commentId]
  );
  if (!commentParentInfo.length) throw new Error(`Unable to fetch parent info for comment with id: ${commentId}`);
  let originalPosterId = commentParentPostAndCommentInfo[0].User_ID;
  let parentCommentId = commentParentPostAndCommentInfo[0].Parent_ID;

  let posterNotificationResult = await db.query(
    'INSERT INTO NOTIFICATION SET ?',
    { User_ID: originalPosterId, Comment_ID: commentId }
  );
  if (!posterNotificationResult.insertId) throw new Error('Failed to insert notifications for original poster.');

  // get poster of parent comment and send them notification
  if (parentCommentId) {
    let parentCommentInfo = await db.query(
      'SELECT User_ID FROM COMMENT WHERE Comment_ID=?',
      [parentCommentId]
    );
    if (!parentCommentInfo.length) throw new Error(`Unable to fetch parent comment with id: ${parentCommentId}, 
                                                    which is parent of ${commentId}`);
    let parentCommentPosterId = parentCommentInfo[0].User_ID;

    let parentCommenterNotificationResult = await db.query(
      'INSERT INTO NOTIFICATION SET ?',
      { User_ID: parentCommentPosterId, Comment_ID: commentId }
    );
    if (!parentCommenterNotificationResult.insertId) throw new Error('Failed to insert notifications');
  }
}

const markNotificationsAsRead = async(userId) => {
  let updateNotificationResult = await db.query(
    'UPDATE NOTIFICATION SET Is_Read=1 WHERE User_ID=?', [userId]
  );
  if (!updateNotificationResult.affectedRows) throw new Error(`Unable to update notification with ID: ${notificationId}`);
}

module.exports = { getNotifications, addNotificationsForComment, markNotificationsAsRead };