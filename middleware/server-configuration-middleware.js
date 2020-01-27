const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(morgan('common'));
}

// so I'm packaging a function that takes in server as parameter and runs configurations on the server that are applied through closure