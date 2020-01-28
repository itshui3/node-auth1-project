const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const db = require('knex')(require('../knexfile').development);

const sessionConfig = {
  name: 'monkey', // sid,
  secret: 'keep it secret', // server uses this secret to verify cookie is valid. Good candidate to be saved in env var
  cookie: {
    maxAge: 1000 * 30,
    secure: false, // true in production
    httpOnly: true, // always true, cannot be accessed from js
    store: new KnexSessionStore({
      knex: db,
      tablename: 'sessions',
      sidfieldname: 'sid',
      createtable: true,
      clearInterval: 1000 * 60 * 5
    })
  },
  resave: false, // 
  saveUninitialized: false, // GDPR compliance, laws against setting cookies automatically
}

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(morgan('common'));
  server.use(session(sessionConfig));
}

// so I'm packaging a function that takes in server as parameter and runs configurations on the server that are applied through closure