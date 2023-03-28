const UserServices = require('../services/user.services');
const transporter = require('../utils/mailer');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserServices.getAll();
    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserServices.update(id, req.body);
    res.status(201).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
