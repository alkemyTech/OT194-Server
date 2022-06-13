const express = require('express');
const membersRouter = express.Router();
const { check } = require('express-validator');
const membersController = require('../controllers/members');
const { validateFields } = require('../middleware/validateFields');
const { adminMiddleware } = require('../middleware/adminCheck');
const protectRoute = require('../middleware/authentication');

membersRouter.put('/:id',
  protectRoute,
  adminMiddleware,
  check('name').not().isEmpty().withMessage('Por favor ingrese un nombre'),
  validateFields,
  membersController.update);

module.exports = membersRouter;
