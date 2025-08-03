const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  zipCode: {
    type: String,
    required: true,
    trim: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  addresses: [addressSchema],
  isVerified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "user",
  },
  // verificationToken: String,
  // verificationTokenExpires: Date,
  // resetPasswordToken: String,
  // resetPasswordExpires: Date
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// userSchema.methods.generateVerificationToken = function() {
//   this.verificationToken = crypto.randomBytes(32).toString('hex');
//   this.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
//   return this.verificationToken;
// };

module.exports = mongoose.model('User', userSchema);