const User = require('../models/User');
const crypto = require('crypto');
const { sendVerificationEmail, sendPasswordResetEmail } = require('../services/emailService');
const { verifyToken,generateToken } = require('../services/tokenService'); 


const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }


    const user = new User({ name, email, password });
    const verificationToken = generateToken(user._id);
    await user.save();

    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({ 
      message: 'Registration successful. Please check your email for verification.'
    });
  } catch (error) {
    res.status(500).json({ error});
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Email not registered' });
    }
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ error: 'Please verify your email before logging in' });
    }


    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        addresses: user.addresses,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; 
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process password reset' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = verifyToken(token);
    // console.log(decoded)

    if (!decoded || !decoded.userId) {
      return res.status(400).json({ error: 'Invalid or malformed token' });
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User already verified' });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email successfully verified' });
  } catch (error) {
    console.error('Email verification error:', error.message);
    res.status(500).json({ error: 'Failed to verify email' });
  }
};
const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ error: 'Email is already verified' });
    }

    const verificationToken = await sendVerificationEmail(email, user._id);
    user.verificationToken = verificationToken;
    await user.save();

    res.json({ message: 'Verification email resent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};





module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerification

};