const express = require('express');
const { check } = require('express-validator');
const testimonialsRouter = express.Router();
const testimonialsController = require('../controllers/testimonials');
const { validateFields } = require('../middleware/validateFields');

testimonialsRouter.post('/', [
  check('name')
    .not().isEmpty().withMessage('El nombre es requerido'),
  check('content')
    .not().isEmpty().withMessage('El contenido es requerido'),
  validateFields
], testimonialsController.create);

module.exports = testimonialsController;
