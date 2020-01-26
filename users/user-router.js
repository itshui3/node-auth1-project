const express = require('express');
const router = express.Router();
const userdb = require('./user-model');

const bcrypt = require('bcrypt');

// grab all user records
router.get('/', (req, res) => {
  // need a db helper
  userdb.find()
    .then( resou => {
      res.status(200).json({ message: `status 200: fetched users`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `status 500: internal server error, failed to fetch users` })
    })

})

// register

router.post('/register', (req, res) => {
  /* 
    grab credentials from req.body
  req.username
  req.password

  */
  req.body.hashed_password = bcrypt.hashSync(req.body.hashed_password, 10);
  userdb.register(req.body)
    .then( resou => {
      res.status(201).json({ message: `status 201: user successfully created`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `status 500: internal server error, failed to create user` })
    })
})

// login

router.post('/login', (req, res) => {
  // grab credentials from headers, how do I do that? **
})

module.exports = router;