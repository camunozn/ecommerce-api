const e = require('express');
const Cart = require('../models/cart.model');
const Products = require('../models/product.model');
const ProductsInCart = require('../models/productInCart.model');

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

  static async addCartProduct(cart_id, data) {
    try {
      const { product_id, quantity } = data;
      const { price, status } = await Products.findOne({
        where: { id: product_id },
      });
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

  static async updateCartTotal(cart_id) {
    try {
      //Get the products in cart and calculate total amount
      const products = await ProductsInCart.findAll({
        where: { cart_id },
      });
      let cartTotal = 0;
      products.map(product => {
        cartTotal += product.quantity * product.price;
      });
      //Update total amount in cart
      return await Cart.update(
        { total_amount: cartTotal },
        { where: { id: cart_id } }
      );
    } catch (error) {
      throw error;
    }
  }

  static async getCartWithProducts(user_id) {
    try {
      return await Cart.findOne({
        where: { user_id },
        include: {
          model: ProductsInCart,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
module.exports = CartServices;
