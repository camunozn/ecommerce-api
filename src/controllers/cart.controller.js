const CartServices = require('../services/cart.services');
const ProductsServices = require('../services/product.services');

const updateCartTotal = async userId => {
  let cartTotal = 0;
  const cart = await CartServices.getCartWithProducts(userId);
  const products = cart.cart_products;
  products.map(product => {
    cartTotal += product.quantity * product.price;
  });

  return cartTotal;
};

exports.getUserCart = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const cart = await CartServices.getCartWithProducts(userId);
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
    const { id: userId } = req.user;
    const { id: cartId } = await CartServices.getCart(userId);

    const { product_id: productId, quantity } = req.body;
    const { price, status } = await ProductsServices.getOne(productId);

    const data = {
      cartId,
      productId,
      quantity,
      price,
      status,
    };

    const [cartProduct, created] = await CartServices.addCartProduct(data);
    if (created) {
      //If product was created, just update cart total
      const cartTotal = await updateCartTotal(userId);
      await CartServices.updateCart(cartId, cartTotal);
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
      const cartTotal = await updateCartTotal(userId);
      await CartServices.updateCart(cartId, cartTotal);
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
