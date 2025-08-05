import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Cart from "./Pages/Cart/Cart";
import Wishlist from "./Pages/Wishlist/Wishlist"
import Products from "./Pages/Products/Products";
import Checkout from "./Pages/Checkout/Checkout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Address from "./Pages/Address";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductForm from "./Pages/productForm";
import ProductList from "./Pages/ProductList";

const App=() =>{
  return (
    <Router>
      <div className="App">
      <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="profile/address" element={<Address />} />
          <Route path="profile/orders" element={<Orders />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="verify-email/:token" element={<VerifyEmail />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/products/new" element={<ProductForm />} />
          <Route path="/admin/products/edit/:id" element={<ProductForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
