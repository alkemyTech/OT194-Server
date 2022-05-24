const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (user_uuid) => {
  let expiration = '15d';

  return jwt.sign({user_uuid}, process.env.JWT_SECRET, {
    expiresIn: expiration
  })
};