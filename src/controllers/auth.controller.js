const UserServices = require('../services/user.services');
const AuthServices = require('../services/auth.services');
const bcrypt = require('bcrypt');

exports.signUp = async (req, res, next) => {
  try {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const user = await UserServices.create(newUser);
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

    const user = await UserServices.getUserByEmail(email);
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
