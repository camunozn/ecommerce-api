const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserServices = require('../services/user.services');
const AuthServices = require('../services/auth.services');

exports.signUp = async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const user = await UserServices.createOne(newUser);
    // incluir envío de mail de confirmación

    const { id, username, email } = user;
    const token = AuthServices.signToken({ id, username, email });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserServices.getOneByEmail(email);
    if (!user)
      return next({
        status: 400,
        message: 'Invalid email',
        errorName: 'User not found',
      });

    const validate = await bcrypt.compare(password, user.password);
    if (!validate)
      return next({
        status: 400,
        message: 'Incorrect password',
        errorName: 'Invalid password',
      });

    const { id, username } = user;

    const token = AuthServices.signToken({ id, username, email });

    res.json({
      status: 'success',
      token,
      data: {
        id,
        username,
        email,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next({
      status: 401,
      error: 'Unauthorized',
      message: 'Not token provided',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: process.env.JWT_ALGORITHM,
    });
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};
