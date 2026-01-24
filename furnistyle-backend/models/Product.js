const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Please add product name'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please add product price']
  },
  image: {
    type: String,
    required: [true, 'Please add product image']
  },
  category: {
    type: String,
    required: [true, 'Please add product category'],
    enum: ['Living Room', 'Dining Room', 'Bedroom', 'Office']
  },
  colors: [{
    type: String
  }],
  sizes: [{
    type: String
  }],
  material: {
    type: String,
    required: [true, 'Please add product material']
  },
  inStock: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true // Automatically add createdAt and updatedAt
});

module.exports = mongoose.model('Product', productSchema);