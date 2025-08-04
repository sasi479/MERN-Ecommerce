const Order = require('../models/Order');
const crypto = require('crypto');
// const Razorpay = require('razorpay');
const { sendOrderConfirmationEmail } = require('../services/emailService');


// const razorpay = new Razorpay({
//   key_id:process.env.RAZORPAY_KEY_ID,      
//   key_secret:process.env.RAZORPAY_SECRET,  
// });



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

    let emailSent= true
    try{
      await sendOrderConfirmationEmail(req.user.email, order);
         
    }

    catch(err){
      emailSent=false

    }

    res.status(201).json(
      {order,emailSent,message:emailSent?"order Craeted and email sent successfully":"order Craeted and email couldn't send"}
    );
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




module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,

};