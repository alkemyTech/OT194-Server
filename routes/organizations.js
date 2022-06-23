const express = require('express');
const organizationsRouter = express.Router();
const organizationsControllers = require('../controllers/organizations');
const { check } = require('express-validator');
const protectRoute = require('../middleware/authentication');
const { adminMiddleware } = require('../middleware/adminCheck');
const { validateFields } = require('../middleware/validateFields');

organizationsRouter.get('/1/public', organizationsControllers.public);

organizationsRouter.put('/organization/:id',
  protectRoute,
  adminMiddleware,
  check('name').not().isEmpty().withMessage('Por favor ingrese un nombre'),
  check('welcomeText')
    .not().isEmpty().withMessage('Por favor ingrese el texto de bienvenida')
    .isLength({ max: 2500 }).withMessage('El texto de bienvenida puede tener un máximo de 2500 caracteres'),
  validateFields,
  organizationsControllers.updateOrg);

module.exports = organizationsRouter;
