const jwt = require('jsonwebtoken');

module.exports = (id) => {
  const expiration = '15d';

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: expiration
  });
};
