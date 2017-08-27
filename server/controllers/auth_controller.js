const User = require('../models/User');
const jwt  = require('jsonwebtoken');

module.exports = {
  signin(req, res, next) {
    const {email, password} = req.body;

    if (!email) {
      res.json({ sucess: false, message: "Authentication failed. Email is required!" });
    } else if (!password) {
      res.json({ sucess: false, message: "Authentication failed. Password is required!" });      
    }

    User.findOne({ email: email })
    .select("password")
    .then(user => {
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // check if password matches
        if (!user.authenticate(password)) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          // if user is found and password is right
          // create a token
          const payload = {
            _id: user._id,
            email: user.email
          };

          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 60*60*24 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        } 
      }  
    })
    .catch(next);
  },
  refreshToken(req, res, next) {
    User.findById(req.decoded._id)
    .then(user => {
      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else {
        // check if password matches
        if (!user.authenticate(password)) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          // if user is found and password is right
          // create a token
          const payload = {
            _id: user._id,
            email: user.email
          };

          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresInMinutes: 1440 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        } 
      }  
    })
    .catch(next);    
  }
}