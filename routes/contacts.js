const express = require('express');
const routerContacts = express.Router();
const contactController = require('../controllers/contacts');
const { validateFields } = require('../middleware/validateFields');
const { check } = require('express-validator');

routerContacts.post('/', [
  check('email')
    .not().isEmpty().withMessage('Por favor ingrese un email')
    .isEmail().withMessage('Por favor ingrese un email válido'),
  check('name').not().isEmpty().withMessage('Por favor ingrese su nombre'),
  validateFields
], contactController.create);

module.exports = routerContacts;
