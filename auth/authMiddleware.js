const bcrypt = require('bcryptjs');

const Users = require('../users/usersModel');

module.exports = (req, res, next) => {
  let {username, password } = req.headers;
  if (username && password) {
    Users.findBy({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        next();
      } else {
        res.status(401).json({message: "Your credentials are invalid"})
      }
    })
    .catch(error => {
      res.status(500).json({message: "error, try again later"});
    });
  } else {
      res.status(400).json({message: "Please provide proper credendtials"})
  }
}