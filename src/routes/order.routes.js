const { Router } = require('express');
const orderController = require('../controllers/order.controller');
const authController = require('../controllers/auth.controller');

const router = Router();

router
  .route('/')
  .get(authController.protect, orderController.getUserOrders)
  .post(authController.protect, orderController.createUserOrder);

module.exports = router;
