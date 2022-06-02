const express = require('express');
const newsRouter = express.Router();
const newsController = require('../controllers/news');

newsRouter.get('/', newsController.news);

newsRouter.get('/:id', newsController.newById);

module.exports = newsRouter;
