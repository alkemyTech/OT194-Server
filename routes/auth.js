const express = require('express');
// const { check } = require('express-validator');
const router = express.Router();
// const { authController } = require('../controllers');
// const { validateFields } = require('../middleware/validateFields');

router.post('/login', (req, res, next) => {
  // res.render('index', { title: 'Express' });
  res.send(req.body);
});

// router.post('/login', [
// check('email')
//   .isEmail().withMessage('The email does not have a valid format')
//   .not().isEmpty().withMessage('The email is needed'),
// check('password', 'Password is not valid')
//   .not().isEmpty(),
// validateFields
// ], authController.login);

module.exports = router;
