const express = require('express');
const router  = express.Router();
const UsersController = require('../controllers/users_controller');

router.post('/users', UsersController.create);

module.exports = router;
