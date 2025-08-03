// const { body, validationResult } = require('express-validator');

// const handleValidationErrors = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

// const validateRegistration = [
//   body('name').trim().notEmpty().withMessage('Name is required'),
//   body('email').isEmail().withMessage('Invalid email address'),
//   body('password')
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long'),
//   handleValidationErrors
// ];

// const validateLogin = [
//   body('email').isEmail().withMessage('Invalid email address'),
//   body('password').notEmpty().withMessage('Password is required'),
//   handleValidationErrors
// ];

// const validateAddress = [
//   body('street').trim().notEmpty().withMessage('Street is required'),
//   body('city').trim().notEmpty().withMessage('City is required'),
//   body('state').trim().notEmpty().withMessage('State is required'),
//   body('zipCode').trim().notEmpty().withMessage('ZIP code is required'),
//   handleValidationErrors
// ];

// module.exports = {
//   validateRegistration,
//   validateLogin,
//   validateAddress
// };