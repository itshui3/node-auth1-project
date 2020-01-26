const userdb = require('../users/user-model');

const regMwStack = [
  validate_reg_creds,
  validate_reg_length,
  validate_reg_dupe
]

module.exports = {
  regMwStack, // mw stack for register post

}

function validate_reg_creds(req, res, next) {
  const { username, hashed_password } = req.body;
  if(username && hashed_password) {
    next();
  } else {
    res.status(400).json({ message: `status 400: user entered invalid credentials, check username &&/|| password` })
  }
}

function validate_reg_length(req, res, next) {
  const { username, hashed_password } = req.body;
  if(username.length > 6 && hashed_password.length > 8) {
    next();
  } else {
    res.status(400).json({ message: `status 400: user entered invalid credentails, check that username &&/|| password are long enough and contain correct characters` })
  }
}

function validate_reg_dupe(req, res, next) {
  const { username } = req.body;
  userdb.findByUsername(username)
    .then( resou => {
      if(resou) {
        console.log(resou);
        res.status(400).json({ message: `status 400: username already exists` })
      } else {
        next();
      }
    })
    .catch( err => {
      res.status(500).json({ message: `status 500: internal server error` })
    })
}