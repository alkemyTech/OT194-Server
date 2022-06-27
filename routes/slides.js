const express = require('express');
const { check } = require('express-validator');
const slidesRouter = express.Router();
const slidesController = require('../controllers/slides');
const { adminMiddleware } = require('../middleware/adminCheck');
const protectRoute = require('../middleware/authentication');
const { validateFields } = require('../middleware/validateFields');

slidesRouter.get('/:newsId', slidesController.getAll);

slidesRouter.put('/:id', [
  protectRoute,
  adminMiddleware,
  check('text')
    .not().isEmpty().withMessage('Por favor ingrese un texto alternativo'),
  validateFields
], slidesController.update);

slidesRouter.post('/:newsId', [
  protectRoute,
  adminMiddleware,
  check('text')
    .not().isEmpty().withMessage('Por favor ingrese un texto alternativo'),
  validateFields
], slidesController.create);

module.exports = slidesRouter;
