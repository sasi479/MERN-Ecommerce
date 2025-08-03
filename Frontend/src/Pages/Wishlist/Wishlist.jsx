import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../Store/wishlistSlice";
import { addToCart } from "../../Store/cartSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const wishlistData = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleToggleWishlist = (item) => {
    dispatch(toggleWishlist(item));
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(toggleWishlist(item));
  };

  if (wishlistData.items.length === 0) {
    return (
      <div className="container text-center my-5">
        <h2 className="fw-bold">Your Wishlist is Empty</h2>
        <p className="text-muted fs-5">
          Looks like you haven't added anything to your wishlist yet.
        </p>
        <Link to="/products">
          <button className="btn btn-warning btn-lg">Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold text-center">My Wishlist</h2>
      <div className="row g-4">
        {wishlistData.items.map((item) => (
          <div key={item.id} className="col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100 shadow-sm">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    className="card-img-top p-3"
                    alt={item.title}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                </Link>
              <div className="card-body d-flex flex-column">
                <Link to={`/product/${item.id}`} >
                  <h5 className="reset-a card-title text-truncate">
                    {item.title}
                  </h5>
                </Link>
                <p className="card-text text-muted">${item.price.toFixed(2)}</p>
                <div className="mt-auto d-flex gap-2">
                  <button
                    className="btn cart-btn w-100  text-white"
                    onClick={() => handleAddToCart(item)}
                  >
                    <i className="fa fa-shopping-cart me-2"></i>Add to Cart
                  </button>
                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => handleToggleWishlist(item)}
                  >
                    <i className="fa fa-trash me-2 "></i>Remove 
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
