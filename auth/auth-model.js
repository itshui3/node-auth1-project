const db = require('knex')(require('../knexfile').development);
const userdb = require('../users/users-model');

module.exports = {
  yeetUser, // registerUser(user) - takes a user and yeets it into db
}

function yeetUser(user) {
  return db('users').insert(user)
    .returning(['id', 'username', 'password']);
}