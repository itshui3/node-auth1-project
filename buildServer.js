//build && config
const express = require('express');
const server = express();
const configuration = require('./middleware/server-configuration-middleware');
configuration(server);

const apiRouter = require('./api/api-router');

server.use('/api', apiRouter);

server.use((req, res) => {
  res.status(404).json({ message: `status 404: resource not found on server` })
});

module.exports = server;