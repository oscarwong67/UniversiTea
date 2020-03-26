'use-strict';

const db = require('./db');
// adding comments to event store database
// Input: Comment ID, Post Content, User ID, Parent ID (if it is a reply)
// Output: Void
const addComment = async (request) => {  
  console.log(request.payload);
    let commentID = request.payload.commentID;
    let content = request.payload.content;
    let userID = request.payload.userID;
    let postID = request.payload.postID;
    let parentID = request.payload.parentID == undefined ? null : request.payload.parentID;
    let isAnon = request.payload.isAnon; 
    
    let event = {
        "Action" : "addComment",
        "Content" : content,
        "User_ID" : userID,
        "Post_ID" : postID,
        "Parent_ID" : parentID,
        "isAnonymous": isAnon,
    };
    
    event = JSON.stringify(event);
    const result = await db.query(
        'INSERT INTO EVENT SET ?',
        { Content : event } 
    );
    return result.insertId;
}

// editing a comment in the event store database
// Input: Comment ID, Content
// Output: Void
const editComment = async (request) => {
    let commentID = request.payload.commentID;
    let isAnon = request.payload.isAnon;
    let newContent = request.payload.newContent;              
    let event = {
        "Action": "editComment",
        "Comment_ID": commentID,
        "isAnonymous": isAnon,
        "Content" : newContent,
    };
    event = JSON.stringify(event);
    await db.query(
        'INSERT INTO EVENT SET ?',
        { Content : event }
    );
    return;
}

// deleting a comment in the event store database
// Input: Comment ID
// Output: Void
const deleteComment = async (request) => {
    let commentID = request.payload.commentID;
                    
    let event = {
        "Action": "deleteComment",
        "Comment_ID": commentID,
    };
    event = JSON.stringify(event);
    await db.query(
        'INSERT INTO EVENT SET ?',
        { Content : event }
    );
    return;
}

module.exports = {addComment, editComment, deleteComment};