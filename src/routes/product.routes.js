const { Router } = require('express');
const {
  getAllProducts,
  createProduct,
  updateProduct,
} = require('../controllers/product.controller');
const {
  createProductValidator,
  updateProductValidator,
} = require('../validators/product.validators');
const authenticate = require('../middlewares/auth.middleware');

const router = Router();

router.get('/api/v1/products', getAllProducts);

router.post(
  '/api/v1/products',
  createProductValidator,
  authenticate,
  createProduct
);

router.put(
  '/api/v1/products/:id_product',
  updateProductValidator,
  authenticate,
  updateProduct
);

module.exports = router;
