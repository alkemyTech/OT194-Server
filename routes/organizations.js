const express = require('express');
const organizationsRouter = express.Router();
const organizationsControllers = require('../controllers/organizations');

organizationsRouter.get('/1/public', organizationsControllers.public);

module.exports = organizationsRouter;
