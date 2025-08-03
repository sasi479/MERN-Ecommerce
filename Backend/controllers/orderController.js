const Order = require('../models/Order');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const { sendOrderConfirmationEmail } = require('../services/emailService');


const razorpay = new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,      
  key_secret:process.env.RAZORPAY_SECRET,  
});



const createOrder = async (req, res) => {
  try {
    const { items, address: shippingAddress, paymentMethod, totalAmount } = req.body;

    if (!items || items.length === 0 || !shippingAddress || !paymentMethod || !totalAmount) {
      return res.status(400).json({ error: 'Missing required order details' });
    }

    const orderStatus = paymentMethod === 'cod' ? 'Pending' : 'Paid';

    const order = new Order({
      user: req.user._id,
      items,
      shippingAddress,
      paymentMethod,
      totalAmount,
      status: orderStatus, 
    });

    await order.save();

    if (paymentMethod === 'cod') {
      await sendOrderConfirmationEmail(req.user.email, order);
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort('-createdAt');
    res.json(orders);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};




const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const options = {
      amount: amount, 
      currency: 'INR',
      receipt: `receipt_${Math.random() * 1000}`,
      payment_capture: 1,
    };
    const order = await razorpay.orders.create(options);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};





const verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, address, totalAmount } = req.body;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET) 
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, error: 'Invalid payment signature' });
    }
    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress: address,
      paymentMethod: 'razorpay',
      status: 'Paid',
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature
    });

    await order.save();

    await sendOrderConfirmationEmail(req.user.email, order);

    res.json({ success: true, order });

  } catch (error) {
    console.error('Payment verification failed:', error);
    res.status(500).json({ success: false, error: 'Payment verification failed' });
  }
};




module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  createRazorpayOrder,
  verifyRazorpayPayment

};