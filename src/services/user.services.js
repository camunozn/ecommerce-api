const Users = require('../models/user.model');

class UserServices {
  static async getAll() {
    try {
      const users = await Users.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const user = await Users.findOne({
        where: { email },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async create(newUser) {
    try {
      const createdUser = await Users.create(newUser);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, data) {
    try {
      const updatedUser = await Users.update(data, {
        where: { id },
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserServices;
