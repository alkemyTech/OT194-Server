const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { adminMiddleware } = require('../middleware/adminCheck');
const protectRoute = require('../middleware/authentication');

router.patch('/', protectRoute, userController.delete);
router.get('/', protectRoute, adminMiddleware, userController.getAllUsers);

module.exports = router;
