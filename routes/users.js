const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validateFields');
const userController = require('../controllers/user');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post(
  '/auth/register',
  [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'password must be at least 6 characters long').isLength({
      min: 6
    }),
    check('firstName', 'firstName is required').not().isEmpty(),
    check('lastName', 'lastName is required').not().isEmpty(),
    validateFields
  ],
  userController.register
);

router.delete('/:id', userController.delete);

module.exports = router;
