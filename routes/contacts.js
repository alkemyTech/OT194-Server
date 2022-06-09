const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/authentication');
const { adminMiddleware } = require('../middleware/adminCheck');
const contactController = require('../controllers/contacts');

router.get('/', protectRoute, adminMiddleware, contactController.getAll);

module.exports = router;
