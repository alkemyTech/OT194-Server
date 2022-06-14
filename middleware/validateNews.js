const { body, validationResult } = require('express-validator');

const validateNews = (req, res, next) => {
  body('name').isLength({ min: 3 }).isString().notEmpty().trim().escape();
  body('content').isLength({ min: 5 }).isString().notEmpty().trim().escape();
  body('categoryId').isLength({ min: 1 }).isNumeric().notEmpty().trim().escape();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validateNews };
