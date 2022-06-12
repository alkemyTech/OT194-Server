const express = require('express');
const testimonialsRouter = express.Router();
const { check } = require('express-validator');
const testimonialsController = require('../controllers/testimonials');
const { validateFields } = require('../middleware/validateFields');
const { adminMiddleware } = require('../middleware/adminCheck');
const protectRoute = require('../middleware/authentication');

testimonialsRouter.post('/',
  check('name').not().isEmpty().withMessage('Por favor ingrese un nombre'),
  check('content')
    .not().isEmpty().withMessage('Por favor ingrese el contenido')
    .isLength({ max: 2500 }).withMessage('El contenido puede tener un máximo de 2500 caracteres'),
  validateFields,
  testimonialsController.create);

testimonialsRouter.put('/:id',
  protectRoute,
  adminMiddleware,
  check('name').not().isEmpty().withMessage('Por favor ingrese un nombre'),
  check('content')
    .not().isEmpty().withMessage('Por favor ingrese el contenido')
    .isLength({ max: 2500 }).withMessage('El contenido puede tener un máximo de 2500 caracteres'),
  validateFields,
  testimonialsController.update);

testimonialsRouter.delete('/:id', testimonialsController.delete);

module.exports = testimonialsRouter;
