const { Op } = require('sequelize');
const Products = require('../models/product.model');
const Users = require('../models/user.model');

class ProductsServices {
  static async getAll(offset, limit) {
    try {
      return await Products.findAndCountAll({
        where: { stock: { [Op.gt]: 0 } },
        offset,
        limit,
        include: {
          model: Users,
          attributes: ['id', 'username'],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getOne(id) {
    try {
      return await Products.findByPk(id);
    } catch (error) {
      throw error;
    }
  }

  static async createOne(data) {
    try {
      return await Products.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async updateOne(id, data) {
    try {
      return await Products.update(data, {
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ProductsServices;
