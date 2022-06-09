const express = require('express');
const { check } = require('express-validator');
const activitiesRouter = express.Router();
const activitiesController = require('../controllers/activities');
const { validateFields } = require('../middleware/validateFields');

activitiesRouter.post('/', [
  check('name')
    .not().isEmpty().withMessage('El nombre es requerido'),
  check('content')
    .not().isEmpty().withMessage('El contenido es requerido'),
  validateFields
], activitiesController.create);

activitiesRouter.put('/:id', [
  check('name')
    .not().isEmpty().withMessage('El nombre es requerido'),
  check('content')
    .not().isEmpty().withMessage('El contenido es requerido'),
  validateFields
], activitiesController.updateById);

module.exports = activitiesRouter;
