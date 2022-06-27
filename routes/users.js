const express = require('express');
const { check } = require('express-validator');
const usersRouter = express.Router();
const usersController = require('../controllers/users');
const protectRoute = require('../middleware/authentication');
const { adminMiddleware } = require('../middleware/adminCheck');
const { validateFields } = require('../middleware/validateFields');

usersRouter.delete('/:id', protectRoute, usersController.delete);

usersRouter.get('/', protectRoute, adminMiddleware, usersController.getAllUsers);

usersRouter.get('/:id', protectRoute, adminMiddleware, usersController.getUserById);

usersRouter.put('/:id',
  protectRoute,
  check('firstName').not().isEmpty().withMessage('Por favor ingrese un nombre'),
  check('lastName').not().isEmpty().withMessage('Por favor ingrese un apellido'),
  validateFields,
  usersController.updateUser);

module.exports = usersRouter;
