require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (userUUID) => {
  const expiration = '15d';

  return jwt.sign({ userUUID }, process.env.JWT_SECRET, {
    expiresIn: expiration
  });
};
