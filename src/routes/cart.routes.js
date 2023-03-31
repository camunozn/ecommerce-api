const { Router } = require('express');
const cartController = require('../controllers/cart.controller');
const authController = require('../controllers/auth.controller');
const cartValidator = require('../validators/cart.validators');

const router = Router();

router.route('/').get(authController.protect, cartController.getUserCart);

router
  .route('/product')
  .post(
    cartValidator.addProductToCart,
    authController.protect,
    cartController.addProductToCart
  );

//TODO add update product from cart endpoint
//TODO add delete product from cart endpoint

module.exports = router;
