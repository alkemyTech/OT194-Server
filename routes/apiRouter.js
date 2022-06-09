const express = require('express');
const apiRouter = express.Router();

apiRouter.use('/auth', require('./auth'));

apiRouter.use('/organizations', require('./organizations'));

apiRouter.use('/users', require('./users'));

apiRouter.use('/news', require('./news'));

apiRouter.use('/activities', require('./activities'));

apiRouter.use('/testimonials', require('./testimonials'));

module.exports = apiRouter;
