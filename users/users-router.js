const userdb = require('./users-model');
const router = require('express').Router();

router.get('/', (req, res) => {
  userdb.findUsers()
    .then( resou => {
      res.status(200).json({ message: `status 200: fetched users`, resource: resou })
    })
    .catch( err => {
      res.status(500).json({ message: `status 500: internal server error` })
    })
  
})

// how do I split up middleware files? categorically-wise

router.use((req, res) => {
  res.status(404).json({ message: `status 404: resource not found in users route` })
})

module.exports = router;