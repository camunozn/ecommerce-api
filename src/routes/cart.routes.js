const { Router } = require('express');
const { addToCart, getCart } = require('../controllers/cart.controller');
const { addToCartValidator } = require('../validators/cart.validators');
const authController = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/api/v1/cart',
  addToCartValidator,
  authController.protect,
  addToCart
);

router.get('/api/v1/cart', authController.protect, getCart);

module.exports = router;
