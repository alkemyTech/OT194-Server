var express = require('express');
const { check } = require("express-validator");
var router = express.Router();
const { authController } = require("../controllers");

// router.post('/login', function(req, res, next) {
//   res.send('hi');
// });

const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }

    next();
}

router.post('/login',[
  check('email')
    .isEmail().withMessage('The email does not have a valid format')
    .not().isEmpty().withMessage('The email is needed'),
  check('password', 'Password is not valid')
    .not().isEmpty(),
  validateFields
], authController.login);

module.exports = router;

