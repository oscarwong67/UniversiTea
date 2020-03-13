'use strict';

const db = require('./db');
const helper = require('./helper');


const addComment = async (request) => {
  let commentID = request.payload.commentID;
  let content = request.payload.content;
  let userID = request.payload.userID;
  let postID = request.payload.postID;
  let parentID = request.payload.parentID == undefined ? null : request.payload.parentID;

  let ver = 1;

  await db.query(
    'INSERT INTO COMMENT SET ?',
    { 
      Comment_ID: commentID,
      Version: ver, 
      User_ID: userID,
      Content: content,
      Post_ID: postID,
      Parent_ID: parentID
    }
  );

  return;
}

const editComment = async (request) => {
  let commentID = request.payload.commentID;
  let newContent = request.payload.newContent;

  await db.query(
    `UPDATE COMMENT SET Content = '${newContent}' WHERE Comment_ID = '${commentID}'`,
  );

  return;
}

const deleteComment = async (request) => {
  let commentID = request.payload.commentID;

  let result = await db.query(
    `DELETE FROM COMMENT 
    WHERE Comment_ID = '${commentID}'`,
  );
  console.log(result);

  return;
}

const getComments = async (request) => {

}

//IF YOU MAKE A NEW FUNCTION, ADD IT HERE OR IT WONT WORK
module.exports = {addComment, editComment, deleteComment, getComments};