const { check, param } = require('express-validator');
const validateResult = require('../utils/validate');

exports.singUp = [
  check('username', 'Error with username field')
    .exists()
    .withMessage('There is not an username property')
    .notEmpty()
    .withMessage('Username cannot be empty')
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 6, max: 30 })
    .withMessage('Username should be between 6 and 30 characters long'),
  check('email', 'Error with email')
    .exists()
    .withMessage('There is not an email property')
    .notEmpty()
    .withMessage('There is no value for the email property')
    .isString()
    .withMessage('Email must be a string')
    .isEmail()
    .withMessage('Email is not in an email format'),
  check('password', 'Error with password')
    .exists()
    .withMessage('There is not a password property')
    .notEmpty()
    .withMessage('There is no value for the password property')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 7 })
    .withMessage('Password must be at least 7 characters long'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

exports.login = [
  check('email', 'Error with email')
    .exists()
    .withMessage('There is not an email property')
    .notEmpty()
    .withMessage('There is no value for the email property')
    .isString()
    .withMessage('Email must be an string')
    .isEmail()
    .withMessage('Email is not in an email format'),
  check('password', 'Error with password')
    .exists()
    .withMessage('There is not a password property')
    .notEmpty()
    .withMessage('There is no value for the password property')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 7 })
    .withMessage('Password must be at least 7 characters long'),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
