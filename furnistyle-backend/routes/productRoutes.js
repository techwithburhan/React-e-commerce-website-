const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// @route   GET /api/products
// @desc    Get all products
router.get('/', getAllProducts);

// @route   POST /api/products
// @desc    Create new product
router.post('/', createProduct);

// @route   GET /api/products/:id
// @desc    Get single product by ID
router.get('/:id', getProductById);

// @route   PUT /api/products/:id
// @desc    Update product
router.put('/:id', updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product
router.delete('/:id', deleteProduct);

module.exports = router;