import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../Store/cartSlice';
import { addOrder, setCredentials } from '../../Store/authSlice';
import axios from 'axios';
import { toast } from 'react-toastify';

function Checkout() {
  const cartData = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const { user, token } = useSelector(state => state.auth);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/addresses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        dispatch(setCredentials({ user: { ...user, addresses: response.data }, token }));
        const defaultAddress = response.data.find(address => address.isDefault);
        setSelectedAddress(defaultAddress || null);
      } catch (error) {
        toast.error('Failed to fetch addresses');
      }
    };
    if (user) fetchAddresses();

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => console.log('Razorpay script loaded successfully');
    script.onerror = () => toast.error('Failed to load Razorpay. Please try again.');
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    if (!selectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }
    if (paymentMethod === 'cod') return placeCodOrder();
    else return handleRazorpayPayment();
  };

  const placeCodOrder = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:3000/api/orders',
        {
          items: items.map(item => ({
            productId: item.id,
            title: item.title,
            image: item.image,
            quantity: item.quantity,
            price: item.price,
          })),
          address: selectedAddress,
          paymentMethod: 'cod',
          totalAmount: total,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );


      dispatch(addOrder(response.data));
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      navigate('/profile/orders');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };



  if (items.length === 0) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning">Your cart is empty. Please add items before checkout.</div>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container my-5">
        <div className="alert alert-info">Please login to continue with checkout.</div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/login', { state: { from: '/checkout' } })}
        >
          Login
        </button>
      </div>
    );
  }

  if (!user?.addresses?.length) {
    return (
      <div className="container my-5">
        <div className="alert alert-info">
          Please add a delivery address to continue with checkout.
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/profile/address',{ state: { from: '/checkout' } })}>
          Add Address
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {loading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 bg-white bg-opacity-75 d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <h2 className="mb-4">Checkout</h2>
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">Delivery Address</h5>
            </div>
            <div className="card-body">
              {user.addresses.map((address, index) => (
                <div key={index} className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="address"
                    id={`address-${index}`}
                    value={index}
                    checked={selectedAddress === address}
                    onChange={() => setSelectedAddress(address)}
                  />
                  <label className="form-check-label" htmlFor={`address-${index}`}>
                    {address.isDefault && <span className="badge bg-primary me-2">Default</span>}
                    <div>{address.name}</div>
                    <div>{address.mobile}</div>
                    <div>{address.street}</div>
                    <div>{address.city}</div>
                    <div>{address.state}</div>
                    <div>{address.zipCode}</div>
                  </label>
                </div>
              ))}
              <button
                className="btn btn-link"
                onClick={() => navigate('/profile/address')}
              >
                Manage Addresses
              </button>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Payment Method</h5>
            </div>
            <div className="card-body">
              {/* <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <label className="form-check-label" htmlFor="card">
                  Razorpay (UPI, Card, Net Banking)
                </label>
              </div> */}
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                />
                <label className="form-check-label" htmlFor="cod">Cash on Delivery</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Order Summary</h5>
                <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Subtotal:</span>
              <span className="fw-bold">${cartData.totalAmount.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Shipping:</span>
              <span className="fw-bold text-success">Free</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="fs-5 fw-bold">Total:</span>
              <span className="fs-5 fw-bold text-primary">
                ${cartData.totalAmount.toFixed(2)}
              </span>
            </div>
            </div>
            <div className="card-body">
              <button
                className="btn btn-primary w-100"
                onClick={handlePlaceOrder}
                disabled={loading || !selectedAddress}
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;