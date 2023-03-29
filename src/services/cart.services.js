const Cart = require('../models/cart.model');
const ProductsInCart = require('../models/productInCart.model');
const Products = require('../models/product.model');

class CartServices {
  static async createCart(user_id) {
    try {
      const data = {
        user_id,
      };
      return await Cart.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async getCartByUser(user_id) {
    try {
      return await Cart.findOne({ where: { user_id } });
    } catch (error) {
      throw error;
    }
  }

  static async getCartProducts(user_id) {
    try {
      return await Cart.findOne({
        where: { user_id },
        include: {
          model: ProductInCart,
          attributes: {
            exclude: ['id', 'cart_id'],
          },
          include: {
            model: Products,
            attributes: {
              include: ['name'],
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async addCartProduct(cart_id, data) {
    try {
      const { product_id, quantity, price, status } = data;
      return await ProductsInCart.findOrCreate({
        where: {
          cart_id,
          product_id,
        },
        defaults: {
          cart_id,
          product_id,
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
