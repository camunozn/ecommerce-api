const Users = require('../models/user.model');

class UserServices {
  static async getAll() {
    try {
      return await Users.findAll();
    } catch (error) {
      throw error;
    }
  }

  static async getOneByEmail(email) {
    try {
      return await Users.findOne({
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  }

  static async createOne(newUser) {
    try {
      return await Users.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async updateOne(id, data) {
    try {
      return await Users.update(data, {
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserServices;
