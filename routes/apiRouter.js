const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/auth', require('./auth'));

apiRouter.use('/organizations', require('./organizations'));

apiRouter.use('/users', require('./users'));

apiRouter.use('/news', require('./news'));

module.exports = apiRouter;
