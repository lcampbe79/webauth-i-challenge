const router = require('express').Router();

const Users = require('./usersModel');

const requiredAuth = require('../auth/authMiddleware');

router.get('/', requiredAuth, (req, res) => {
  Users.find()
    .then(users => {
      return res.status(200).json(users);
    })
    .catch((error) => {
      // console.log(error)
      res.status(500).json(error)
    })
})

module.exports = router;
