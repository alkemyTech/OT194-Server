const express = require('express');
const organizationsRouter = express.Router();
const organizationsControllers = require('../controllers/organizations');

organizationsRouter.get('/1/public', organizationsControllers.public);
organizationsRouter.put('/organization/:id', organizationsControllers.updateOrg);

module.exports = organizationsRouter;
