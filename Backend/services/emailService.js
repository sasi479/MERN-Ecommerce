// const transporter = require('../config/email');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .email-header {
          text-align: center;
          background-color: #007bff;
          color: #ffffff;
          padding: 20px;
          border-radius: 8px 8px 0 0;
        }
        .email-header h1 {
          margin: 0;
          font-size: 24px;
        }
        .email-body {
          padding: 20px;
          line-height: 1.6;
          color: #333333;
        }
        .email-body a {
          display: inline-block;
          margin: 20px 0;
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
        .email-body a:hover {
          background-color: #0056b3;
        }
        .email-footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #777777;
        }
        .email-footer a {
          color: #007bff;
          text-decoration: none;
        }
        .email-footer a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Email Verification</h1>
        </div>
        <div class="email-body">
          <p>Hi,</p>
          <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>
          <a href="${process.env.FRONTEND_URL}/verify-email/${verificationToken}">Verify Email</a>
          <p>If you did not create this account, you can safely ignore this email.</p>
          <p>This verification link will expire in 24 hours.</p>
        </div>
        <div class="email-footer">
          <p>If you have any issues, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
          <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
     `,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Failed to send verification email');
  }
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Request',
    html: `
      <h1>Reset Your Password</h1>
      <p>Please click the link below to reset your password:</p>
      <a href="${process.env.FRONTEND_URL}/reset-password/${resetToken}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

const sendOrderConfirmationEmail = async (email, order) => {

  console.log(email)
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Order Confirmation',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #4CAF50;">Thank You for Your Order!</h1>
            <p style="color: #888;">Your order has been successfully placed.</p>
          </div>
          <div style="padding: 15px; background-color: #f9f9f9; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Order Details</h2>
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Items:</h3>
            <ul style="list-style: none; padding: 0; margin: 0;">
              ${order.items.map(item => `
                <li style="margin-bottom: 10px; padding: 10px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 6px;">
                  <strong>${item.title}</strong>
                  <div style="color: #888;">Quantity: ${item.quantity}</div>
                  <div style="color: #888;">Price: $${item.price.toFixed(2)}</div>
                </li>
              `).join('')}
            </ul>
          </div>
          <div style="margin-bottom: 20px;">
            <h3 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Shipping Address:</h3>
            <p style="margin: 0; padding: 10px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 6px;">
              ${order.shippingAddress.street}<br>
              ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}
            </p>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #888;">If you have any questions, feel free to <a href="mailto:codetestms.com" style="color: #4CAF50; text-decoration: none;">contact us</a>.</p>
            <p style="color: #888;">Thank you for shopping with us!</p>
          </div>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};


module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendOrderConfirmationEmail
};