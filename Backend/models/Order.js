// const mongoose = require('mongoose');

// const orderItemSchema = new mongoose.Schema({
//   productId: {
//     type: Number,
//     required: true
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   price: {
//     type: Number,
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1
//   },
//   image: String
// });

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   items: [orderItemSchema],
//   totalAmount: {
//     type: Number,
//     required: true
//   },
//   shippingAddress: {
//     street: String,
//     city: String,
//     state: String,
//     zipCode: String
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'processing', 'shipped', 'delivered'],
//     default: 'pending'
//   },
//   paymentMethod: {
//     type: String,
//     enum: ['card', 'cod'],
//     required: true
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);
const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: String
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  status: {
    type: String,
    // enum: ['pending', 'processing', 'shipped', 'delivered'],
    enum: ["Pending", "Paid", "Completed", "Failed"],
    default: 'Pending'
  },
  paymentMethod: {
    type: String,
    enum: [ 'cod'], 
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
 
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
