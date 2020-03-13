'use-strict';

const db = require('./db');
// adding comments to event store database
// Input: Comment ID, Post Content, User ID, Parent ID (if it is a reply)
// Output: Void
const addComment = async (request) => {  
    let commentID = request.payload.commentID;
    let content = request.payload.content;
    let userID = request.payload.userID;
    let postID = request.payload.postID;
    let parentID = request.payload.parentID == undefined ? null : request.payload.parentID;
    let event = {
        "Action" : "addComment",
        "Comment_ID": commentID,
        "Content" : content,
        "User_ID" : userID,
        "Post_ID" : postID,
        "Parent_ID" : parentID
    };
    
    event = JSON.stringify(event);
    await db.query(
        'INSERT INTO EVENT SET ?',
        { Content : event } 
    );
    return;
}

// editing a comment in the event store database
// Input: Comment ID, Content
// Output: Void
const editComment = async (request) => {
    let commentID = request.payload.commentID;
    let newContent = request.payload.newContent;              
    let event = {
        "Action": "editComment",
        "Comment_ID": commentID,
        "Content" : newContent,
    };
    event = JSON.stringify(event);
    await db.query(
        'INSERT INTO EVENT SET ?',
        { Content : event }
    );
    return;
}

// deleteing a comment in the event store database
// Input: Comment ID
// Output: Void
const deleteComment = async (request) => {
    let commentID = request.payload.commentID;
                    
    let event = {
        "Action" : "deleteComment",
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