'use-strict';

const db = require('./db');
// adding comments to event store database
// Input: Comment ID, Post Content, User ID, Parent ID (if it is a reply)
// Output: Void
const addComment = async (commentID, content, userID, postID, parentID, isAnon) => {
  let event = {
    "Action": "addComment",
    "Content": content,
    "User_ID": userID,
    "Post_ID": postID,
    "Parent_ID": parentID,
    "isAnonymous": isAnon,
  };

  event = JSON.stringify(event);
  const result = await db.query(
    'INSERT INTO EVENT SET ?',
    { Content: event }
  );
  return result.insertId;
}

// editing a comment in the event store database
// Input: Comment ID, Content
// Output: Void
const editComment = async (commentID, isAnon, newContent) => {
  let event = {
    "Action": "editComment",
    "Comment_ID": commentID,
    "isAnonymous": isAnon,
    "Content": newContent,
  };
  event = JSON.stringify(event);
  await db.query(
    'INSERT INTO EVENT SET ?',
    { Content: event }
  );
  return;
}

// deleting a comment in the event store database
// Input: Comment ID
// Output: Void
const deleteComment = async (commentID) => {
  let event = {
    "Action": "deleteComment",
    "Comment_ID": commentID,
  };
  event = JSON.stringify(event);
  await db.query(
    'INSERT INTO EVENT SET ?',
    { Content: event }
  );
  return;
}

module.exports = { addComment, editComment, deleteComment };