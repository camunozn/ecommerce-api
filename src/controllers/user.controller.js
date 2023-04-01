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
    //FIX extract only fields that can be updated from req.body
    const updatedUser = await UserServices.updateOne(id, req.body);
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
