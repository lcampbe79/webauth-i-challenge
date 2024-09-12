const bcrypt = require('bcryptjs');

const router = require('express').Router();

const Users = require('../users/usersModel');

router.post('/register', (req,res) => {
  let userInformation = req.body;
 
  const hashedPassword = bcrypt.hashSync(userInformation.password, 10);

  userInformation.password = hashedPassword

  Users.add(userInformation)
    .then(saved => {
      req.session.user = saved;
      //console.log(req.session.username)
      res.status(201).json(saved);
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
})

router.post('/login', (req,res) => {
  let {username, password} = req.body;

  Users.findBy({username})
    
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        // console.log(req.session)
        return res.status(200).json({message: `Hello ${user.username}`})
      } else {
        return res.status(401).json({message: "Your credentials are invalid"})
      }
    })
    .catch(error => {
      // console.log(error)
      res.status(500).json(error)
    })
})

router.get('/logout', (req, res) => {
  if(req.session) { 
    req.session.destroy(error => {
      if (error) {
        res.status(500).json({message: 'You are NOT logged out.'})
      }
      res.status(200).json({message: "Successfully logged out."})
    }) 
  } else {
    res.status(200).json({message: "bye"})
  }
  
})

module.exports = router;