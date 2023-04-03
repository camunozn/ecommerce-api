const { check, param } = require('express-validator');
const validateResult = require('../utils/validate');

exports.addProductToCart = [
  check('productId', 'Error with productId field')
    .exists()
    .withMessage('Property productId must exist')
    .notEmpty()
    .withMessage('Property productId cannot be empty')
    .isInt()
    .withMessage('Property productId must be an integer'),
  check('quantity', 'Error with quantity field')
    .exists()
    .withMessage('Property quantity must exist')
    .notEmpty()
    .withMessage('Property quantity cannot be empty')
    .isInt()
    .withMessage('Property quantity must be an integer'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
