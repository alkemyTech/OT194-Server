const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv').config();

module.exports = (id) => {
  const expiration = '15d';

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expiration
  });
};
