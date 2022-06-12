const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/auth', require('./auth'));

apiRouter.use('/organizations', require('./organizations'));

apiRouter.use('/users', require('./users'));

apiRouter.use('/news', require('./news'));

apiRouter.use('/activities', require('./activities'));

apiRouter.use('/contacts', require('./contacts'));

apiRouter.use('/members', require('./members'));

module.exports = apiRouter;
