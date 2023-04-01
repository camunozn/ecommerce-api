const Cart = require('../models/cart.model');
const ProductsInCart = require('../models/productInCart.model');

class CartServices {
  static async createCart(userId) {
    try {
      const data = {
        userId,
      };
      return await Cart.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async getCart(userId) {
    try {
      return await Cart.findOne({
        where: { userId },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateCart(cartId, cartTotal) {
    try {
      return await Cart.update(
        { totalAmount: cartTotal },
        { where: { id: cartId } }
      );
    } catch (error) {
      throw error;
    }
  }

  static async emptyCart(cartId) {
    try {
      return await ProductsInCart.destroy({ where: { cartId } });
    } catch (error) {
      throw error;
    }
  }

  static async getCartWithProducts(userId) {
    try {
      return await Cart.findOne({
        where: { userId },
        include: {
          model: ProductsInCart,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async addCartProduct(data) {
    try {
      const { cartId, productId, quantity, price, status } = data;
      return await ProductsInCart.findOrCreate({
        where: {
          cartId,
          productId,
        },
        defaults: {
          cartId,
          productId,
          quantity,
          price,
          status,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateCartProduct(id, data) {
    try {
      return await ProductsInCart.update(data, {
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = CartServices;
