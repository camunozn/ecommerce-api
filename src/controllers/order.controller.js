const CartServices = require('../services/cart.services');
const OrderServices = require('../services/order.services');
const ProductsServices = require('../services/product.services');
const transporter = require('../utils/mailer');

exports.getUserOrders = async (req, res, next) => {
  const { id: user_id } = req.user;
  try {
    const orders = await OrderServices.getOrdersWithProducts(user_id);
    res.status(200).json({
      status: 'success',
      data: {
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.createUserOrder = async (req, res, next) => {
  try {
    const { id: user_id } = req.user;
    //Get cart data and products

    //Create order with cart data and user_id
    await OrderServices.createOrder(user_id, order);
    //Add cart products to order
    await OrderServices.addOrderProducts(order_id, products);
    //Clear cart data and delete products in cart

    //Return order with products
    const order = await OrderServices.getOrderWithProducts(order_id);
    res.status(201).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};
