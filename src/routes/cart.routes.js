const { Router } = require('express');
const cartController = require('../controllers/cart.controller');
const authController = require('../controllers/auth.controller');

const router = Router();

router.route('/').get(authController.protect, cartController.getCart);

router
  .route('/:id')
  .post(authController.protect, cartController.addProductToCart);

module.exports = router;
