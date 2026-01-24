const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');

// POST submit contact form
router.post('/', submitContact);

// GET all contacts (for admin)
router.get('/', getAllContacts);

// GET single contact by ID (for admin)
router.get('/:id', getContactById);

// PUT update contact status (for admin)
router.put('/:id', updateContactStatus);

// DELETE contact (for admin)
router.delete('/:id', deleteContact);

module.exports = router;