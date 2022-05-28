const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv').config();

module.exports = (userUuid) => {
  const expiration = '15d';

  return jwt.sign({ userUuid }, process.env.JWT_SECRET, {
    expiresIn: expiration
  });
};
