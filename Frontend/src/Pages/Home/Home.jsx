import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const categories = [
    {
      id: 1,
      name: "women's clothing",
      imageUrl: "/images/women-fashion.jpg",
      description: "Trending fashion collections",
    },
    {
      id: 2,
      name: "electronics",
      imageUrl: "/images/electronics.jpg",
      description: "Latest gadgets and electronics",
    },
    {
      id: 3,
      name: "jewelery",
      imageUrl: "/images/jewellery.jpg",
      description: "Elegant jewelry pieces",
    },

    {
      id: 4,
      name: "men's clothing",
      imageUrl: "/images/men-fashion.jpg",
      description: "Trending fashion collections",
    },
  ];
  return (
    <>
      <div className="banner text-white d-flex align-items-center">
        <div className="container">
          <h1>Welcome to Smart Bazar</h1>
          <p className="lead">Discover amazing products at great prices</p>
          <Link to="/products" className="btn btn-light btn-lg">
            Shop Now
          </Link>
        </div>
      </div>
      <div className="container py-5">
        <h2 className="text-center mb-5">Shop by Category</h2>
        <div className="row g-4">
          {categories.map((category) => (
            <div key={category.id} className="col-md-6 col-lg-3">
              <Link to={`/products?category=${category.name}`} className="text-decoration-none">
                <div className="card border-0 shadow-sm h-100">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="card-img-top category-image"
                  />
                  <div className="card-body text-center">
                    <h5 className="h5 ">{category.name}</h5>
                    <p className="text-muted">{category.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="container py-5">
        <h2 className="text-center mb-5">Our Services</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow text-center p-4">
              <div className=" mb-3">
                <i className="fa-solid fa-truck icon-large"></i>
              </div>
              <h3 className="h5 mb-3">Free Shipping</h3>
              <p className="text-muted mb-0">
                Free shipping on all orders over $50
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow text-center p-4">
              <div className=" mb-3">
                <i className="fa-solid fa-headphones icon-large"></i>
              </div>
              <h3 className="h5 mb-3">24/7 Support</h3>
              <p className="text-muted mb-0">
                Round the clock customer support
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow text-center p-4">
              <div className="mb-3">
                <i className="fa-solid fa-sack-dollar icon-large"></i>
              </div>
              <h3 className="h5 mb-3">Money Back</h3>
              <p className="text-muted mb-0">15-days money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light py-5 container">
          <div className="row justify-content-center">
            <div className="col-md-8 text-center">
              <h2 className="mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-muted mb-4">Get updates about new products and special offers!</p>
              <form className="d-flex gap-2 justify-content-center">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  style={{ maxWidth: '400px' }}
                />
                <button type="button" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
      </div>
      <footer className="bg-dark text-light py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-4">
              <h3 className="text-white fs-5 fw-semibold mb-3">
                About Smart Bazar
              </h3>
              <p className=" small">
                Your one-stop destination for premium products. We offer the
                best selection of electronics, accessories, and home goods.
              </p>
            </div>

            <div className="col-md-3 mb-4">
              <h3 className="text-white fs-5 fw-semibold mb-3">Quick Links</h3>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="/about"
                    className="text-decoration-none text-white  d-block py-1"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className=" text-decoration-none text-white  d-block py-1"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/shipping"
                    className=" text-decoration-none text-white  d-block py-1"
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a
                    href="/returns"
                    className=" text-decoration-none text-white  d-block py-1"
                  >
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h3 className="text-white fs-5 fw-semibold mb-3">Categories</h3>
              <ul className="list-unstyled">
                <li>
                  <a
                    href="/category/electronics"
                    className=" text-decoration-none text-white  d-block py-1"
                  >
                    Electronics
                  </a>
                </li>
                <li>
                  <a
                    href="/category/accessories"
                    className=" text-decoration-none text-white  d-block py-1"
                  >
                    Accessories
                  </a>
                </li>
                <li>
                  <a
                    href="/category/home"
                    className=" text-decoration-none text-white  d-block py-1"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/category/deals"
                    className=" text-decoration-none text-white  d-block py-1"
                  >
                    Deals
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h3 className="text-white fs-5 fw-semibold mb-3">
                Connect With Us
              </h3>
              <div className="d-flex mb-3  ">
                <a href="#" className=" me-4 text-white">
                  <i className="fab fa-facebook icon-medium"></i>
                </a>
                <a href="#" className=" me-4 text-white">
                  <i className="fab fa-twitter icon-medium"></i>
                </a>
                <a href="#" className=" me-4 text-white">
                  <i className="fab fa-instagram icon-medium"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fas fa-envelope icon-medium"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-top border-secondary pt-4 mt-4 text-center small">
            <p>&copy; 2025 Smart Bazar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
