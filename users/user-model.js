const db = require('../api/api-router').db;

module.exports = {
  find, // find() - fetches all users from db

}

function find() {
  return db('users');
}

function register(credentials) {

}

function login(credentials) {
  
}