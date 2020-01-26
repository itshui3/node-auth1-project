//build
const express = require('express');
const server = express();

server.use(express.json());
server.use(require('helmet')());
server.use(require('morgan')('common'));

module.exports = server;