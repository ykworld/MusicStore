const User = require('../models/User');

module.exports = {
  create(req, res, next) {
    let newUser = new User(req.body);
    newUser.save()
      .then(user => res.send(user))
      .catch( e => 
        res.status(400).send({ 
          success: false, 
          message: e.message
        })
      );
  }
}