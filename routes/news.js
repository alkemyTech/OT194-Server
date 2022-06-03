const express = require('express');
const newsRouter = express.Router();
const newsController = require('../controllers/news');

newsRouter.get('/', newsController.news);

newsRouter.get('/:id', newsController.newById);

newsRouter.put('/:id', newsController.updateNewById);

module.exports = newsRouter;
