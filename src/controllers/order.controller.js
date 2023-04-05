const CartServices = require('../services/cart.services');
const OrderServices = require('../services/order.services');
const ProductsServices = require('../services/product.services');
const Email = require('../utils/mailer');
const transporter = require('../utils/mailer');

exports.getUserOrders = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const orders = await OrderServices.getAllOrdersWithProducts(userId);
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
    const { id: userId } = req.user;
    //Get cart data and products
    const {
      id: cartId,
      totalAmount,
      cart_products: cartProducts,
    } = await CartServices.getCartWithProducts(userId);
    //Create order with cart data and userId
    const order = {
      userId,
      totalAmount,
    };
    const { id: orderId } = await OrderServices.createOrder(order);
    //Add cart products to order
    const orderProducts = cartProducts.map(product => ({
      ...product.dataValues,
      orderId,
    }));
    await OrderServices.addOrderProducts(orderId, orderProducts);
    //Clear cart data and delete products in cart
    await CartServices.emptyCart(cartId);
    await CartServices.updateCart(cartId, 0);
    //Send confirmation mail
    const url = `${req.protocol}://${req.get('host')}/orders`;
    await new Email(req.user, url).sendOrderConfirmation();
    //Return order with products
    const orderWithProducts = await OrderServices.getOneOrderWithProducts(
      orderId
    );
    res.status(201).json({
      status: 'success',
      data: {
        order: orderWithProducts,
      },
    });
  } catch (error) {
    next(error);
  }
};
