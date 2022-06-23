const express = require('express');
const { check } = require('express-validator');
const newsRouter = express.Router();
const newsController = require('../controllers/news');
const { adminMiddleware } = require('../middleware/adminCheck');
const protectRoute = require('../middleware/authentication');
const { validateFields } = require('../middleware/validateFields');

newsRouter.get('/', newsController.getEntries);

newsRouter.get('/:id', newsController.getEntryById);

newsRouter.put('/:id', [
  protectRoute,
  adminMiddleware,
  check('name')
    .not().isEmpty().withMessage('Por favor ingrese un nombre')
    .isLength({ min: 3 }),
  check('content')
    .not().isEmpty().withMessage('Por favor ingrese un contenido')
    .isLength({ min: 5 }),
  validateFields
], newsController.updateEntryById);

newsRouter.delete('/:id', protectRoute, adminMiddleware, newsController.deleteEntry);

newsRouter.post('/', [
  protectRoute,
  adminMiddleware,
  check('name')
    .not().isEmpty().withMessage('Por favor ingrese un nombre')
    .isLength({ min: 3 }),
  check('content')
    .not().isEmpty().withMessage('Por favor ingrese un contenido')
    .isLength({ min: 5 }),
  validateFields
], newsController.createEntry);

module.exports = newsRouter;
