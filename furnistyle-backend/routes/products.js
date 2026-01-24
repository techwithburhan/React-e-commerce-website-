const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct
} = require('../controllers/productController');

// GET all products
router.get('/', getAllProducts);

// GET single product by ID
router.get('/:id', getProductById);

// GET products by category
router.get('/category/:category', getProductsByCategory);

// POST create new product (for admin)
router.post('/', createProduct);

module.exports = router;