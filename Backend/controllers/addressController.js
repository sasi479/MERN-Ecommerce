const User = require('../models/User');

const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user.addresses);
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
};

const addAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { name, mobile, street, city, state, zipCode, isDefault } = req.body;
    if (!name || !mobile || !street || !city || !state || !zipCode) {
      return res.status(400).json({ error: 'All address fields (name, mobile, street, city, state, zipCode) are required' });
    }

    if (isDefault) {
      user.addresses.forEach(addr => (addr.isDefault = false));
    }

    user.addresses.push({ name, mobile, street, city, state, zipCode, isDefault });
    await user.save();

    res.status(201).json(user.addresses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add address' });
  }
};

const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const address = user.addresses.id(req.params.id);
    if (!address) return res.status(404).json({ error: 'Address not found' });

    if (req.body.isDefault) {
      user.addresses.forEach(addr => (addr.isDefault = false));
    }

    Object.assign(address, req.body);
    await user.save();

    res.json(user.addresses);
  } catch (error) {
    console.log(error)

    res.status(500).json({ error: 'Failed to update address' });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const address = user.addresses.id(req.params.id);
    if (!address) return res.status(404).json({ error: 'Address not found' });

    user.addresses.pull(req.params.id);
    await user.save();

    res.json(user.addresses);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to delete address' });
  }
};

module.exports = { getAddresses, addAddress, updateAddress, deleteAddress };