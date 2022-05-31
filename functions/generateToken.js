const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv').config();

module.exports = (userUUID) => {
  const expiration = '15d';

  return jwt.sign({ userUUID }, process.env.JWT_SECRET, {
    expiresIn: expiration
  });
};
