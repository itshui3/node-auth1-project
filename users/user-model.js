// const db = require('../api/api-router').db;
const knex = require('knex');
const config = require('../knexfile').development;

const db = knex(config);

module.exports = {
  find, // find() - fetches all users from db
  register, // register(credentials) - registers user
  login, // login(credentials) - logs user in
}

function find() {
  return db('users');
}

function findById(id) {
  return db('users').where({ id });
}

function register(credentials) {
  return db('users').insert(credentials)
    .returning('*');
}

function login(credentials) {
  /*
    what needs to happen here is creds need to match
    a positive/negative response needs to be resolved
    on basis of match boolean
  */
}