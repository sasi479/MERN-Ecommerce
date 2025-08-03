import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../../Store/cartSlice";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import "./Cart.css";

const Cart = () => {
  const cartData = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const handleQuantityChange = (item, newQuantity) => {
    const payload = { item, newQuantity: Math.max(0, newQuantity) };
    dispatch(updateQuantity(payload));
  };

  const handleRemove = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to proceed');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  if (cartData.items.length === 0) {
    return (
      <div className="container-fluid text-center my-2">
        <div className="py-5">
          <h2 className="fw-bold mb-4">Your Cart is Empty</h2>
          <p className="text-muted fs-5 mb-4">
            Looks like you haven’t added anything to your cart yet.
          </p>
          <Link to="/products">
            <button className="btn btn-warning btn-lg px-5 ">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid my-3">
      <h2 className="mb-4 fw-bold text-center">My Cart</h2>
      <div className="row p-3">
        <div className="col-lg-8 col-12 my-1" id="cart-container">
          {cartData.items.map((item) => (
            <div key={item.id} className="row cart-item-card mb-3 bg-light p-3">
              <div className="col-12 col-md-3 mb-3 mb-md-0">
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.title} className="w-100" />
                </Link>
              </div>
              <div className="col-12 col-md-9">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <Link to={`/product/${item.id}`} className="w-75">
                    <h5 className="reset-a card-title text-truncate">
                      {item.title}
                    </h5>
                  </Link>
                  <div className="fw-bold">${item.price}</div>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <div className="input-group quantity-group w-auto">
                    <button
                      className="btn btn-outline-dark"
                      onClick={() =>
                        handleQuantityChange(item, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="form-control text-center"
                      id="quantity-input"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item, Number(e.target.value))
                      }
                    />
                    <button
                      className="btn btn-outline-dark"
                      onClick={() =>
                        handleQuantityChange(item, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-outline-danger ms-3"
                    onClick={() => handleRemove(item)}
                  >
                    <i className="fa fa-trash me-2"></i> Remove Item
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4 col-12 p-4 my-1 cart-summary bg-light border rounded shadow-sm">
          <h3 className="text-center mb-4">Order Summary</h3>
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
          <button className="btn btn-dark w-100 py-2 mb-2"
          onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
          <button
            className="btn btn-outline-danger w-100 py-2"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
