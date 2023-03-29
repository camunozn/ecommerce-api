const CartServices = require('../services/cart.services');
const ProductsServices = require('../services/product.services');

exports.getCart = async (req, res, next) => {
  const { id: user_id } = req.user;
  try {
    const cart = await CartServices.getCartByUser(user_id);
    res.json({
      status: 'success',
      data: {
        cart,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.addProductToCart = async (req, res, next) => {
  try {
    const { id: cart_id } = req.params;
    const data = req.body;
    const [result, created] = await CartServices.addCartProduct(cart_id, data);
    // if product exists in cart, update product quantity and price
    if (!created) {
      result.quantity += data.quantity;
      result.price += data.price;
      const updatedProduct = await CartServices.updateCartProduct(id, result);
      res.status(200).json({
        status: 'success',
        data: {
          product: updatedProduct,
        },
      });
    } else {
      // if product does not exists in cart, send added product
      const addedProduct = result;
      res.status(201).json({
        status: 'success',
        data: {
          product: addedProduct,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
