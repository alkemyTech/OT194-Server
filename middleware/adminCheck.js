const adminMiddleware = (req, res, next) => {
  if (req.user.roleId !== 2) { return res.status(403).json({ message: 'Admin access denied' }); }
  next();
};

module.exports = { adminMiddleware };
