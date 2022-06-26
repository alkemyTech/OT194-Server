const express = require('express');
const { check } = require('express-validator');
const activitiesRouter = express.Router();
const activitiesController = require('../controllers/activities');
const { validateFields } = require('../middleware/validateFields');
const { adminMiddleware } = require('../middleware/adminCheck');
const protectRoute = require('../middleware/authentication');

activitiesRouter.get('/', activitiesController.getActivities);

activitiesRouter.get('/:id', activitiesController.getActivityById);

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
], activitiesController.update);

activitiesRouter.put('/:id',
  protectRoute,
  adminMiddleware,
  check('name').not().isEmpty().withMessage('Por favor ingrese un nombre'),
  check('content')
    .not().isEmpty().withMessage('Por favor ingrese el contenido')
    .isLength({ max: 2500 }).withMessage('El contenido puede tener un máximo de 2500 caracteres'),
  validateFields,
  activitiesController.update);

activitiesRouter.delete('/:id',
  protectRoute,
  adminMiddleware,
  activitiesController.delete
);

module.exports = activitiesRouter;
