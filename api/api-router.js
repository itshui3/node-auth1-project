const express = require('express');
const router = express.Router();

const userRouter = require('../users/users-router');
const authRouter = require('../auth/auth-router');

router.use('/restricted/users', userRouter);
router.use('/auth', authRouter);

router.get('/', (req, res) => {
  res.status(200).json({ message: `status 200: welcome to the api` })
})

router.use((req, res) => {
  res.status(404).json({ message: `status 404: resource not found within api routes` })
})

module.exports = router;