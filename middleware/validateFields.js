const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
  const result = validationResult(req);

  if (typeof result.errors[0] === 'object') {
    return res.status(400).json({
      message: result.errors[0].msg, errors: result.errors
    });
  }

  next();
};

module.exports = { validateFields };
