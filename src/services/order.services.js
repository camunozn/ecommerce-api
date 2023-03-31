const Order = require('../models/order.model');
const ProductsInOrder = require('../models/productInOrder.model');

class OrderServices {
  static async getOrdersWithProducts(user_id) {
    try {
      return await Order.findAll({
        where: { user_id },
        include: {
          model: ProductsInOrder,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async createOrder(user_id, order) {
    try {
      //FIX move logic to controller, only pass clean data
    } catch (error) {
      throw error;
    }
  }

  static async addOrderProducts(order_id, products) {
    try {
      //FIX move logic to controller, only pass clean data
    } catch (error) {
      throw error;
    }
  }

  static async getOrderWithProducts(id) {
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
}
module.exports = OrderServices;
