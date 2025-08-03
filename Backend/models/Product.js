const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);