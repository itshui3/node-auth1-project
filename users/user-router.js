//helpers
const userdb = require('./user-model');
//dependencies
const express = require('express');
const bcrypt = require('bcrypt');
//build
const router = express.Router();
//mw
const { auth } = require('../middleware/');

router.get('/', (req, res) => {
  userdb.find()
    .then( resou => {
      res.status(200).json({ message: `status 200: fetched users`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `status 500: internal server error, failed to fetch users` })
    })
})

router.post('/register', ...auth.regMwStack, (req, res) => {
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

router.post('/login', (req, res) => {
  console.log(req.headers.hashed_password);
  const username = req.headers.username;
  const textpassword = req.headers.hashed_password;
  userdb.findByUsername(username)
    .then( resou => {
      console.log(resou, 'resou');
      if(username && bcrypt.compareSync(textpassword, resou.hashed_password)) {
          res.status(200).json({ message: `status 200: welcome ${resou.username}`})
        } else {
          res.status(401).json({ message: `status 401: invalid credentials` })
        }
    })
})

module.exports = router;