import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../Store/authSlice";
import { toast } from "react-toastify";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const user = useSelector((state) => state.auth.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest("#navbarDropdown")) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <nav className="d-flex bg-light justify-content-between align-items-center px-3 py-2">
      <div className="logo">
        <Link to="/">
          <h1>Smart Bazar</h1>
        </Link>
      </div>

      <div className="d-flex gap-3 align-items-center">
        {user ? (
          <div className="nav-item dropdown">
            <button
              className={`nav-link dropdown-toggle ${
                isDropdownOpen ? "show" : ""
              }`}
              id="navbarDropdown"
              type="button"
              onClick={toggleDropdown}
            >
              Hello, {user.name || "User"}
            </button>

            <ul
              className={`dropdown-menu dropdown-menu-end ${
                isDropdownOpen ? "show" : ""
              }`}
              aria-labelledby="navbarDropdown"
            >
              <li>
                <Link className="dropdown-item" to="/profile">
                  My Profile
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/profile/orders">
                  My Orders
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/profile/address">
                  My Addresses
                </Link>
              </li>
              {user.role === "admin" && (
                <>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/admin/products">
                      Manage Products
                    </Link>
                  </li>
                </>
              )}
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link to="/login">
              <i className="fa fa-user-circle user-icon"></i>
            </Link>
          </>
        )}
        <Link to="/wishlist">
          <i className="fa fa-heart"></i>
        </Link>
        <Link to="/cart">
          <div className="position-relative">
            <i className="fa fa-shopping-cart"></i>
            {cartQuantity > 0 && (
              <span id="cart-count" className="flex-center fs-12">
                {cartQuantity}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
