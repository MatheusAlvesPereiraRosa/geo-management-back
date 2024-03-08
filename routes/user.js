const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

// Example routes
router.get('', UserController.getAllUsers);
router.post('/create', UserController.createUser);
router.post('/filter', UserController.getOneUser);

module.exports = router;