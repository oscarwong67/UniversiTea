'use-strict';

require('dotenv').config();
const fetch = require('node-fetch');

const getUsers = async(request) => {
  const url = `${commentsMicroservice}${request.url.pathname}${request.url.search}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

const addSchool = async(request) => {
  const url = `${commentsMicroservice}/api/addComment`;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(request.payload),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(res);
  return res;
}

const deleteSchool = async(request) => {
  const url = `${commentsMicroservice}/api/deleteComment`;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(request.payload),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(res);
  return res;
}

const editSchool = async(request) => {
  const url = `${commentsMicroservice}/api/editComment`;
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(request.payload),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(res);
  return res;
}

module.exports = {getUsers, addSchool, deleteSchool, editSchool};