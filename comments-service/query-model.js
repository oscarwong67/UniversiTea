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

  const insertResult = await db.query(
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

  return insertResult.insertId;
}

const editComment = async () => {
  let eventContent = await db.query(
    'SELECT Content FROM EVENT WHERE Timestamp = (SELECT MAX(Timestamp) FROM EVENT)'
  );

  eventContent = eventContent[0]['Content'];
  eventContent = await JSON.parse(eventContent);

  let commentID = eventContent['Comment_ID'];
  let newContent = eventContent['Content'];
  let isAnon = eventContent['isAnonynous'];

  await db.query(
    `UPDATE COMMENT SET Content = ?, isAnonymous = ? WHERE Comment_ID = ?`,
    [newContent, isAnon, commentID]
  );

  await db.query(
    `UPDATE COMMENT SET Version = Version + 1 WHERE Comment_ID = ?`, 
    [commentID]
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
    `DELETE FROM COMMENT WHERE Comment_ID = ?`,
    [commentID]
  );

  return;
}

const getComments = async (request) => {
  let postID = request.query.postID;
  let parentID = request.query.parentID;
  let result;
  if (String(parentID) === String(undefined)) {
    result = await db.query(`
      SELECT C.*, U.Fname, U.Degree_Type, S.SchoolName, S.School_ID
      FROM COMMENT AS C, USER AS U, SCHOOL AS S
      WHERE C.Post_ID=? AND C.Parent_ID IS NULL AND C.User_ID=U.User_ID AND U.School_ID=S.School_ID`, 
      [postID]
    );
  } else {
    result = await db.query(`
      SELECT C.*, U.Fname, U.Degree_Type, S.SchoolName, S.School_ID
      FROM COMMENT AS C, USER AS U, SCHOOL AS S
      WHERE C.Post_ID=? AND C.Parent_ID=? AND C.User_ID=U.User_ID AND U.School_ID=S.School_ID`, 
      [postID, parentID]
    );
  }
  
  return {...result};
}

//IF YOU MAKE A NEW FUNCTION, ADD IT HERE OR IT WONT WORK
module.exports = {addComment, editComment, deleteComment, getComments};