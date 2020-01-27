const authdb = require('./auth-model');
const bcjs = require('bcryptjs');
const router = require('express').Router();

const authmw = require('../middleware/auth-middleware');
const { reg_middleware_st, login_middleware_st } = authmw;

router.post('/register', ...reg_middleware_st, (req, res) => {
  req.body.password = bcjs.hashSync(req.body.password, 10);
  authdb.yeetUser(req.body)
    .then( resou => {
      res.status(201).json({ message: `status 201: user successfully registered`, resource: resou })
    })
    .catch( err => {
      console.log(err);
      res.status(500).json({ message: `status 500: internal server error, failed to register user` })
    })
})

router.post('/login', ...login_middleware_st, (req, res) => {
  res.status(200).json({ message: `status 200: logged in` });
})

module.exports = router;