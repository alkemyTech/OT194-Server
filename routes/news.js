const express = require('express');
const newsRouter = express.Router();
const newsController = require('../controllers/news');
const { validateNews } = require('../middleware/validateNews');

newsRouter.get('/', newsController.news);

newsRouter.get('/:id', newsController.newById);

newsRouter.put('/:id', newsController.updateNewById);

newsRouter.delete('/:id', newsController.deleteNew);

newsRouter.post('/:new', validateNews, newsController.createNew);

module.exports = newsRouter;
