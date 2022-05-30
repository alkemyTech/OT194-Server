const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.put('/:id', userController.delete);

module.exports = router;
