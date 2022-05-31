const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/auth', require('./auth'));

apiRouter.use('/organizations', require('./organizations'));

apiRouter.use('/users', require('./users'));

module.exports = apiRouter;
