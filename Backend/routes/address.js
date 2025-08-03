const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { 
  getAddresses, 
  addAddress, 
  updateAddress, 
  deleteAddress 
} = require('../controllers/addressController');
// const { validateAddress } = require('../middleware/validation');

router.use(auth);
// api/address
router.get('/', getAddresses);
// router.post('/', validateAddress, addAddress);
router.post('/',addAddress);
// router.put('/:id', validateAddress, updateAddress);
router.put('/:id', updateAddress);
router.delete('/:id', deleteAddress);

module.exports = router;