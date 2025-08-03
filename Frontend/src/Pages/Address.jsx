

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'; // Add useLocation
import axios from 'axios';
import { toast } from 'react-toastify';
import { setCredentials } from '../Store/authSlice';

function Address() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get location state
  const { user, token } = useSelector(state => state.auth);
  const [newAddress, setNewAddress] = useState({
    name: '',
    mobile: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: false,
  });
  const [editAddress, setEditAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/addresses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCredentials({ user: { ...user, addresses: response.data }, token }));
      } catch (error) {
        toast.error('Failed to fetch addresses');
      }
    };
    if (user) fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const targetState = editAddress ? setEditAddress : setNewAddress;
    targetState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:3000/api/addresses',
        newAddress,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setCredentials({ user: { ...user, addresses: response.data }, token }));
      setNewAddress({
        name: '',
        mobile: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        isDefault: false,
      });
      toast.success('Address added successfully');
      if (location.state?.from) {
        navigate(location.state.from);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to add address');
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/addresses/${editAddress._id}`,
        editAddress,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setCredentials({ user: { ...user, addresses: response.data }, token }));
      setEditAddress(null);
      toast.success('Address updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update address');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (index) => {
    setLoading(true);
    try {
      const addressId = user.addresses[index]._id;
      await axios.delete(`http://localhost:3000/api/addresses/${addressId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedAddresses = user.addresses.filter((_, i) => i !== index);
      dispatch(setCredentials({ user: { ...user, addresses: updatedAddresses }, token }));
      toast.success('Address removed successfully');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to remove address');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (index) => {
    setEditAddress({ ...user.addresses[index] });
  };

  const cancelEditing = () => {
    setEditAddress(null);
  };

  return (
    <div className="container my-5">
      <div className="card mb-4">
        <div className="card-header">
          <h4 className="mb-0">My Addresses</h4>
        </div>
        <div className="card-body">
          {loading && (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <ul className="list-group mb-4">
            {user?.addresses?.map((address, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                <div>
                  {address.isDefault && <span className="badge bg-primary me-2">Default</span>}
                  <div className="mb-0">
                    <p>{address.name}</p>
                    <p>{address.mobile}</p>
                    <p>{address.street}</p>
                    <p>{address.city}</p>
                    <p>{address.state}</p>
                    <p>{address.zipCode}</p>
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => startEditing(index)}
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(index)}
                    disabled={loading}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h5>{editAddress ? 'Edit Address' : 'Add New Address'}</h5>
          <form onSubmit={editAddress ? handleEditSubmit : handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={editAddress ? editAddress.name : newAddress.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile</label>
              <input
                type="text"
                className="form-control"
                name="mobile"
                value={editAddress ? editAddress.mobile : newAddress.mobile}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                className="form-control"
                name="street"
                value={editAddress ? editAddress.street : newAddress.street}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                name="city"
                value={editAddress ? editAddress.city : newAddress.city}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={editAddress ? editAddress.state : newAddress.state}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">ZIP Code</label>
              <input
                type="text"
                className="form-control"
                name="zipCode"
                value={editAddress ? editAddress.zipCode : newAddress.zipCode}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isDefault"
                name="isDefault"
                checked={editAddress ? editAddress.isDefault : newAddress.isDefault}
                onChange={handleChange}
                disabled={loading}
              />
              <label className="form-check-label" htmlFor="isDefault">
                Set as default address
              </label>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : editAddress ? 'Update Address' : 'Add Address'}
            </button>
            {editAddress && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={cancelEditing}
                disabled={loading}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Address;