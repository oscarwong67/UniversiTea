'use strict';

const db = require('./db');
const helper = require('./helper');


const addComment = async () => {

  let eventContent = await db.query(
    'SELECT Content FROM EVENT WHERE Timestamp = (SELECT MAX(Timestamp) FROM EVENT)'
  );

  eventContent = eventContent[0]['Content'];
  eventContent = await JSON.parse(eventContent);

  let content = eventContent['Content'];
  let userID = eventContent['User_ID'];
  let postID = eventContent['Post_ID'];
  let parentID = eventContent['Parent_ID'];
  let isAnon = eventContent['isAnonymous'];

  let ver = 1;

  await db.query(
    'INSERT INTO COMMENT SET ?',
    { 
      Version: ver, 
      User_ID: userID,
      Content: content,
      Post_ID: postID,
      Parent_ID: parentID,
      isAnonymous: isAnon
    }
  );

  return;
}

const editComment = async () => {
  let eventContent = await db.query(
    'SELECT Content FROM EVENT WHERE Timestamp = (SELECT MAX(Timestamp) FROM EVENT)'
  );

  eventContent = eventContent[0]['Content'];
  eventContent = await JSON.parse(eventContent);

  let commentID = eventContent['Comment_ID'];
  let newContent = eventContent['Content'];

  await db.query(
    `UPDATE COMMENT SET Content = '${newContent}' WHERE Comment_ID = '${commentID}'`,
  );

  await db.query(
    ` UPDATE COMMENT SET Version = Version + 1 WHERE Comment_ID = '${commentID}'`
  );

  return;
}

const deleteComment = async () => {
  let eventContent = await db.query(
    'SELECT Content FROM EVENT WHERE Timestamp = (SELECT MAX(Timestamp) FROM EVENT)'
  );

  eventContent = eventContent[0]['Content'];
  eventContent = await JSON.parse(eventContent);

  let commentID = eventContent['Comment_ID'];

  let result = await db.query(
    `DELETE FROM COMMENT 
    WHERE Comment_ID = '${commentID}'`,
  );

  return;
}

const getComments = async (request) => {
  let postID = request.query.postID;

  const result = await db.query(
    `SELECT * FROM COMMENT 
    WHERE Post_ID = '${postID}'`,
  );

  return {...result};
}

//IF YOU MAKE A NEW FUNCTION, ADD IT HERE OR IT WONT WORK
module.exports = {addComment, editComment, deleteComment, getComments};