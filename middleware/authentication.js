const jwt = require('jsonwebtoken');
const User = require('../database/models/index').User;

const protectRoute = async (req, res, next) => {
  let token = '';
  let decodedToken = '';

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Get token from header
    token = req.headers.authorization.split(' ')[1];
    try {
      // Verify token
      decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (req.app.get('env') === 'development') console.log(error);

      return res.status(401).json({ message: 'Not authorized, invalid token' });
    };

    // Get user from the token
    req.user = await User.findOne({
      raw: true,
      attributes: { exclude: ['password'] },
      where: { userUUID: decodedToken.userUUID }
    });

    // Check if it was a wrong token or something went wrong
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    };

    next();
  };

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  };
};

module.exports = protectRoute;
