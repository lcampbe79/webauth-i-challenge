const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/usersModel');

router.post('/register', (req,res) => {
  let userInformation = req.body;
 
  const hashedPassword = bcrypt.hashSync(userInformation.password, 10);

  userInformation.password = hashedPassword

  Users.add(userInformation)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
})

module.exports = router;