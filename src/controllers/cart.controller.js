const CartServices = require('../services/cart.services');

exports.getUserCart = async (req, res, next) => {
  const { id: user_id } = req.user;
  try {
    const cart = await CartServices.getCartWithProducts(user_id);
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
    const data = req.body;
    const cart_id = req.params.id;
    const [cartProduct, created] = await CartServices.addCartProduct(
      cart_id,
      data
    );
    if (created) {
      //If product was created, just update cart total
      await CartServices.updateCartTotal(cart_id);
      //Send response
      res.status(201).json({
        status: 'success',
        data: {
          product: cartProduct,
        },
      });
    } else {
      //If product already existed in cart, update product quantity
      const updatedQuantity = cartProduct.quantity + data.quantity;
      const updatedProduct = {
        ...cartProduct.dataValues,
        quantity: updatedQuantity,
      };
      await CartServices.updateCartProduct(updatedProduct.id, updatedProduct);
      //Update cart total
      await CartServices.updateCartTotal(cart_id);
      //Send response
      res.status(200).json({
        status: 'success',
        data: {
          product: updatedProduct,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
