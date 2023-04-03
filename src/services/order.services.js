const { where } = require('sequelize');
const Order = require('../models/order.model');
const ProductsInOrder = require('../models/productInOrder.model');

class OrderServices {
  static async getAllOrdersWithProducts(userId) {
    try {
      return await Order.findAll({
        where: { userId },
        include: {
          model: ProductsInOrder,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getOneOrderWithProducts(id) {
    try {
      return await Order.findAll({
        where: { id },
        include: {
          model: ProductsInOrder,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async createOrder(order) {
    try {
      return await Order.create(order);
    } catch (error) {
      throw error;
    }
  }

  static async addOrderProducts(id, products) {
    try {
      return await ProductsInOrder.bulkCreate(products, { where: { id } });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = OrderServices;
