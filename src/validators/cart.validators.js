const { check, param } = require('express-validator');
const validateResult = require('../utils/validate');

exports.addProductToCart = [
  check('product_id', 'Error with product_id field')
    .exists()
    .withMessage('Property product_id must exist')
    .notEmpty()
    .withMessage('Property product_id cannot be empty')
    .isInt()
    .withMessage('Property product_id must be an integer'),
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
