//build
const express = require('express');
const server = express();

server.use(express.json());
server.use(require('helmet')());
server.use(require('morgan')('common'));

const apiRouter = require('./api/api-router').router;

server.use('/api', apiRouter);

server.get('/', (req, res) => {
  res.status(200).json({ message: `welcome to auth1-project. Visit /api to get started`})
})

server.use((req, res) => {
  res.status(404).json({ message: `status 404: resource not found on server`})
})

module.exports = server;