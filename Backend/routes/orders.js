const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { 
  createOrder, 
  getUserOrders, 
  getOrderById,
  // createRazorpayOrder, 
  // verifyRazorpayPayment  
} = require('../controllers/orderController');

router.use(auth);

router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);


// Razorpay routes

// router.post('/razorpay', auth, createRazorpayOrder);
// router.post('/verify', auth, verifyRazorpayPayment);


module.exports = router;