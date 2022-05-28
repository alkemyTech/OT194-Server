const express = require('express');
const authRouter = express.Router();
const { check } = require('express-validator');
const { register, login } = require('../controllers/auth');
const { validateFields } = require('../middleware/validateFields');

// Register
authRouter.post('/register', [
  check('email')
    .not().isEmpty().withMessage('Por favor ingrese un email')
    .isEmail().withMessage('Por favor ingrese un email válido'),
  check('password')
    .not().isEmpty().withMessage('Por favor ingrese una contraseña')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  check('firstName').not().isEmpty().withMessage('Por favor ingrese su nombre'),
  check('lastName').not().isEmpty().withMessage('Por favor ingrese su apellido'),
  validateFields
], register
);

// Login
authRouter.post('/login', [
  check('email')
    .not().isEmpty().withMessage('Por favor ingrese un email')
    .isEmail().withMessage('Por favor ingrese un email válido'),
  check('password')
    .not().isEmpty().withMessage('Por favor ingrese una contraseña'),
  validateFields
], login);

module.exports = authRouter;
