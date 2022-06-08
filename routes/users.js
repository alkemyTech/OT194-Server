const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const adminCheck = require('../middleware/adminCheck');
const auth = require('../middleware/authentication');

router.put('/:id', userController.delete);
router.get('/users', auth, adminCheck, userController.getAllUsers);

module.exports = router;
