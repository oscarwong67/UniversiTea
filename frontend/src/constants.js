const API_ADDRESS = process.env.VUE_APP_API_ADDRESS ? '' : 'http://localhost:3000';
// in production, use same address as deployment
module.exports = { API_ADDRESS };
