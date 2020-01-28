const db = require('knex')(require('../knexfile').development);

module.exports = {
  findUsers, // findUsers() - fetch for users indiscriminately
  findUserByName, // findUserByName(username)
  findUserById, // findUserById(id)
}

function findUsers() {
  return db('users');
}

function findUserById(id) {
  return db('users').where({ id }).first();
}

function findUserByName(username) {
  return db('users').where({ username }).first();
}