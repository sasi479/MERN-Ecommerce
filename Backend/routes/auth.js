const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  forgotPassword, 
  resetPassword,
  verifyEmail,
  resendVerification 

} = require('../controllers/authController');
// const { validateRegistration, validateLogin } = require('../middleware/validation');

// router.post('/register', validateRegistration, register);
router.post('/register', register);
// router.post('/login', validateLogin, login);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/verify-email/:token', verifyEmail);
router.post('/verify/resend', resendVerification);

module.exports = router;