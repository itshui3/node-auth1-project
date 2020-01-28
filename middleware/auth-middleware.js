// register auth
// 1) I want to check that req.body username && password both exist *
// 2) I want to check that req.body username && password both follow standards of 8+ characters length
// 3) I want to check that username does not currently exist and will require my user-helpers

const userdb = require('../users/users-model');
const crypt = require('bcryptjs');

const reg_middleware_st = [
  reg_validate_userExists,
  reg_validate_userLength,
  reg_validate_usernameAvailable
]

const login_middleware_st = [
  login_validate_userExists,
  login_validate_usernameInSystem,
  login_validate_password
]

module.exports = {
  reg_middleware_st,
  login_middleware_st
}

function reg_validate_userExists(req, res, next) {
  console.log('validate_userExists');
  if(req.body.username && req.body.password) {
    next();
  } else {
    res.status(400).json({ message: `status 400: cannot process request, username &&/|| password missing`})
  }
}

function reg_validate_userLength(req, res, next) {
  if(req.body.username.length > 7 && req.body.password.length > 7) {
    next();
  } else {
    res.status(400).json({ message: `status 400: cannot process request, username &&/|| password too short` })
  }
}

function reg_validate_usernameAvailable(req, res, next) {
  userdb.findUserByName(req.body.username)
    .then( resou => {
      if (resou) {
        res.status(409).json({ message: `status 409: user pre-exists in database. Use a different name` })
      } else {
        next();
      }
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `status 500: internal server error, could not validate user` })
    })
}

function login_validate_userExists(req, res, next) {
  console.log('validate_userExists');
  if(req.headers.username && req.headers.password) {
    next();
  } else {
    res.status(400).json({ message: `status 400: cannot process request, username &&/|| password missing`})
  }
}

function login_validate_usernameInSystem(req, res, next) {
  console.log('login_validate_usernameInSystem');
  userdb.findUserByName(req.headers.username)
    .then( resou => {
      if (resou) {
        next();
      } else {
        res.status(400).json({ message: `status 400: user does not exist in database. Check credentials` })
      }
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `status 500: internal server error, could not validate user` })
    })
}

function login_validate_password(req, res, next) {
  console.log('login_validate_password');
  console.log(req.headers.username);
  userdb.findUserByName(req.headers.username)
    .then( user => {
      if(crypt.compareSync(req.headers.password, user.password)) {
        next();
      } else {
        res.status(401).json({ message: `status 401: password credentials did not match value stored in db`})
      }
    })
    .catch( err => {
      res.status(500).json({ message: `status 500: internal server error, could not validate password` })
    })
}