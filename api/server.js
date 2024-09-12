const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStorage = require('connect-session-knex')(session)

const apiRouter = require('./apiRouter');
const authRouter = require('../auth/authRouter')
const knexConnection = require('../database/dbConfig');

const server = express();

const sessionConfig = {
  name: 'Private',
  secret: process.env.COOKIE_SECRET || 'secret password',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: process.env.NODE_ENV === 'development' ? false : true,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
  store: new KnexSessionStorage({
    knex: knexConnection,
    clearInterval: 1000 * 60 * 10,
    tablename: 'user_sessions',
    sidfieldname: 'id',
    createtable: true
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

server.use('/api', apiRouter);
server.use('/auth', authRouter)



server.get('/', (req, res) => {
  res.json({api: 'Looking awesome so far...', session: req.session})
})

module.exports = server;