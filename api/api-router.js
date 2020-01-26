const express = require('express');

const router = express.Router();

const responseBody = `
  <h1>API Routes</h1>

  <h2>Register</h2>
  <p>/api/users/register - post</p>

  <h2>Login</h2>
  <p>/api/users/login - post</p>

  <h2>Users</h2>
  <p>/api/users - get</p>
`

router.get('/', (req, res) => {
  res.status(200).send(responseBody);
})

router.use((req, res) => {
  res.status(404).json({ message: `status 404: resource not found in api`})
})

const knex = require('knex');
const config = require('../knexfile').development;

const db = knex(config);

module.exports = {
  router,
  db
};