const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  getContactById,
  deleteContact
} = require('../controllers/contactController');

// @route   POST /api/contact
// @desc    Submit contact form
router.post('/', submitContact);

// @route   GET /api/contact
// @desc    Get all contacts (admin only in production)
router.get('/', getAllContacts);

// @route   GET /api/contact/:id
// @desc    Get single contact by ID
router.get('/:id', getContactById);

// @route   DELETE /api/contact/:id
// @desc    Delete contact
router.delete('/:id', deleteContact);

module.exports = router;