const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/auth', require('./auth'));

apiRouter.use('/organizations', require('./organizations'));

module.exports = apiRouter;
