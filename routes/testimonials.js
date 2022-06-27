const express = require('express');
const testimonialsRouter = express.Router();
const { check } = require('express-validator');
const testimonialsController = require('../controllers/testimonials');
const { validateFields } = require('../middleware/validateFields');
const { adminMiddleware } = require('../middleware/adminCheck');
const protectRoute = require('../middleware/authentication');

testimonialsRouter.get('/:id', testimonialsController.getOne);

testimonialsRouter.get('/', testimonialsController.getAll);

testimonialsRouter.post('/',
  check('name')
    .not().isEmpty().withMessage('Por favor ingrese un nombre')
    .isLength({ max: 240 }).withMessage('El nombre puede tener un maximo de 240 caracteres'),
  check('content')
    .not().isEmpty().withMessage('Por favor ingrese el contenido')
    .isLength({ max: 2500 }).withMessage('El contenido puede tener un maximo de 2500 caracteres'),
  validateFields,
  testimonialsController.create);

testimonialsRouter.put('/:id',
  protectRoute,
  adminMiddleware,
  check('name')
    .not().isEmpty().withMessage('Por favor ingrese un nombre')
    .isLength({ max: 240 }).withMessage('El nombre puede tener un maximo de 240 caracteres'),
  check('content')
    .not().isEmpty().withMessage('Por favor ingrese el contenido')
    .isLength({ max: 2500 }).withMessage('El contenido puede tener un maximo de 2500 caracteres'),
  validateFields,
  testimonialsController.update);

testimonialsRouter.delete('/:id',
  protectRoute,
  adminMiddleware,
  testimonialsController.delete
);

module.exports = testimonialsRouter;
