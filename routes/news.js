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
    .isLength({ max: 240 }).withMessage('El nombre puede tener un maximo de 240 caracteres'),
  check('content')
    .not().isEmpty().withMessage('Por favor ingrese un contenido')
    .isLength({ max: 2500 }).withMessage('El contenido puede tener un maximo de 2500 caracteres'),
  validateFields
], newsController.updateEntryById);

newsRouter.delete('/:id', protectRoute, adminMiddleware, newsController.deleteEntry);

newsRouter.post('/', [
  protectRoute,
  adminMiddleware,
  check('name')
    .not().isEmpty().withMessage('Por favor ingrese un nombre')
    .isLength({ max: 240 }).withMessage('El nombre puede tener un maximo de 240 caracteres'),
  check('content')
    .not().isEmpty().withMessage('Por favor ingrese un contenido')
    .isLength({ max: 2500 }).withMessage('El contenido puede tener un maximo de 2500 caracteres'),
  validateFields
], newsController.createEntry);

module.exports = newsRouter;
