const { check, param, oneOf } = require('express-validator');
const validateResult = require('../utils/validate');

exports.createProduct = [
  check('name', 'Error with name field')
    .exists()
    .withMessage('Property name should exists')
    .notEmpty()
    .withMessage('Property name cannot be empty')
    .isString()
    .withMessage('Property name must be a string')
    .isLength({ min: 6, max: 30 })
    .withMessage('Property name must be between 6 and 30 characters long'),
  check('description', 'Error with description field')
    .exists()
    .withMessage('Property description should exists')
    .notEmpty()
    .withMessage('Property description cannot be empty')
    .isString()
    .withMessage('Property description must be a string')
    .isLength({ min: 6 })
    .withMessage('Property description must be at least 6 characters long'),
  check('price', 'Error with price field')
    .exists()
    .withMessage('Property price should exists')
    .notEmpty()
    .withMessage('Property price cannot be empty')
    .isFloat()
    .withMessage('Property price must be a floating number'),
  check('stock', 'Error with stock field')
    .exists()
    .withMessage('Property stock should exists')
    .notEmpty()
    .withMessage('Property stock cannot be empty')
    .isInt()
    .withMessage('Property stock must be an integer'),
  check('productImage', 'Error with product image field')
    .exists()
    .withMessage('Property product image should exists')
    .notEmpty()
    .withMessage('Property product image cannot be empty')
    .isURL()
    .withMessage('Property product image must be a valid URL'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

exports.updateProduct = [
  param('id').isInt().withMessage('Id field must be an integer'),

  check('description', 'Error with description field')
    .optional()
    .notEmpty()
    .withMessage('Property description cannot be empty')
    .isString()
    .withMessage('Property description must be a string')
    .isLength({ min: 6 })
    .withMessage('Property description must be at least 6 characters long'),
  check('price', 'Error with price field')
    .optional()
    .notEmpty()
    .withMessage('Property price cannot be empty')
    .isFloat()
    .withMessage('Property price must be a floating number'),
  check('stock', 'Error with stock field')
    .optional()
    .notEmpty()
    .withMessage('Property stock cannot be empty')
    .isInt()
    .withMessage('Property stock must be an integer'),
  check('productImage', 'Error with product image field')
    .optional()
    .notEmpty()
    .withMessage('Property product image cannot be empty')
    .isURL()
    .withMessage('Property product image must be a valid URL'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
