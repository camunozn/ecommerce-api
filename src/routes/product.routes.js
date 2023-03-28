const { Router } = require('express');
const productController = require('../controllers/product.controller');
const productValidator = require('../validators/product.validators');
const authController = require('../controllers/auth.controller');

const router = Router();

router
  .route('/')
  .get(productController.getAllProducts)
  .post(
    productValidator.createProduct,
    authController.protect,
    productController.createProduct
  );

router
  .route('/:id')
  .put(
    productValidator.updateProduct,
    authController.protect,
    productController.updateProduct
  );

module.exports = router;
