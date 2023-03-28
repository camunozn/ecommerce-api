const { Router } = require('express');
const { createOrder, getOrder } = require('../controllers/order.controller');
const authController = require('../controllers/auth.controller');

const router = Router();

router.post('/api/v1/order/:user', authController.protect, createOrder);

router.get('/api/v1/order', authController.protect, getOrder);

module.exports = router;
