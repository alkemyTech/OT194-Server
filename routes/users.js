const express = require('express');
const { register } = require('../controllers/user');
const router = express.Router();
const { check } = require('express-validator');
const { validateFields } = require('../middleware/validateFields');
const { getUser } = require('../controllers/auth');
const protectRoute = require('../middleware/authentication');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
// user = {email,first name, last name,}
router.get('/auth/me', protectRoute, getUser)

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
  register
);

module.exports = router;
