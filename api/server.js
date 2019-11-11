const express = require('express');
const helmet = require('helmet')

const apiRouter = require('./apiRouter');
const authRouter = require('../auth/authRouter')
const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api', apiRouter);
server.use('/auth', authRouter)


server.get('/', (req, res) => {
  res.send('Everything looks good...so far')
})

module.exports = server;