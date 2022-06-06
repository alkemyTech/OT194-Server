const express = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validateFields');
const contactsRouter = express.Router();
const contactsControllers = require('../controllers/contacts');

contactsRouter.post(
  '/1/public',
  [
    check('email')
      .not()
      .isEmpty()
      .withMessage('Por favor ingrese un email')
      .isEmail()
      .withMessage('Por favor ingrese un email válido'),
    check('name').not().isEmpty().withMessage('Por favor ingrese su nombre'),
    validateFields
  ],
  contactsControllers.postContact
);

module.exports = contactsRouter;
