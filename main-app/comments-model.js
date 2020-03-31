'use-strict';

require('dotenv').config();
const fetch = require('node-fetch');
const commentsMicroservice = process.env.COMMENTS_SERVICE;

const getComments = async(request) => {
  const url = `${commentsMicroservice}${request.url.pathname}${request.url.search}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

const addComment = async(request) => {
  const url = `${commentsMicroservice}/api/addComment`;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(request.payload),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(res);
  return res;
}

const deleteComment = async(request) => {
  const url = `${commentsMicroservice}/api/deleteComment`;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(request.payload),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(res);
  return res;
}

const editComment = async(request) => {
  const url = `${commentsMicroservice}/api/editComment`;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(request.payload),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(res);
  return res;
}

module.exports = {getComments, addComment, deleteComment, editComment};