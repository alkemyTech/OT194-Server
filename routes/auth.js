var express = require('express');
const { check } = require("express-validator");
var router = express.Router();
const { authController } = require("../controllers");
const validateFields = require("../middlewares/validate-fields");

router.post('/login',[
  check('email')
    .isEmail().withMessage('The email does not have a valid format')
    .not().isEmpty().withMessage('The email is needed'),
  check('password', 'Password is not valid')
    .not().isEmpty(),
  validateFields
], authController.login);

module.exports = router;

