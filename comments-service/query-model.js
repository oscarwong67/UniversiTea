'use strict';

const db = require('./db');
const helper = require('./helper');

// must first determine if commentID already exists in database, then act accordingly
const handleEvent = async (request) => {
  let commentID = request.payload.commentID;
  let content = request.payload.content;
  let userID = request.payload.userID;
  let postID = request.payload.postID;
  let parentID = request.payload.parentID;

  // i wanted to query to check if a comment exist but i just realized idk if its gonna work bc its a POST method
}

const addComment = async (request) => {

}

const editComment = async (request) => {

}

const deleteComment = async (request) => {

}

const getComments = async (request) => {

}

//IF YOU MAKE A NEW FUNCTION, ADD IT HERE OR IT WONT WORK
module.exports = {addComment, editComment, deleteComment, getComments};