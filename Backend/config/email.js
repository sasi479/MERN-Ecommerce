const nodemailer = require('nodemailer');

const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
};

const transporter = nodemailer.createTransport(emailConfig);

module.exports = transporter;