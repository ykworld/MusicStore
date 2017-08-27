const express = require('express');
const router  = express.Router();
const AuthController = require('../controllers/auth_controller');
const UserController = require('../controllers/users_controller');

router.post('/signin', AuthController.signin);
router.post('/signup', UserController.create);

module.exports = router;
