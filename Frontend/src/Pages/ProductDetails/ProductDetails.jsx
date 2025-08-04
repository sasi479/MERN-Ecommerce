import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Store/cartSlice";
import { toggleWishlist } from "../../Store/wishlistSlice";
const baseUrl = import.meta.env.VITE_BASE_URL;

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item?._id === product?._id);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    let payload = { ...product, quantity: 1 };
    dispatch(addToCart(payload));
    
  };
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="py-5 text-center container">
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div className="container py-3">
      <div className="row product-details">
        <div className="col-md-4 mb-5 ">
          <img className="w-100" src={`${baseUrl}/${product.image}`} alt="" />
        </div>
        <div className="col-md-7">
          <h1 className="mb-3">{product?.title}</h1>
          <div className="product-rating">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
          <div className="my-3 fs-18">
            MRP: $<span className="fw-600">{product?.price}</span>
          </div>

          <div className="my-3 text-muted text-justify">
            {product?.description}
          </div>

          <div className="d-flex gap-3 my-2">
            <button className="btn cart-btn text-white" onClick={handleAddToCart}>
              <i className="fa fa-shopping-cart"></i>
              <span className="mx-2">Add to Cart</span>
            </button>
            <button className={`btn 
            ${isWishlisted ? "btn-danger" : "btn-outline-danger"}
            `}
              onClick={() => dispatch(toggleWishlist(product))}>
              <i className={`fa-regular fa-heart ${isWishlisted ? "fa-solid" : "fa-regular"}`}></i>            
              <span className="mx-2"> {isWishlisted ? "Wishlisted" : "Save to Wishlist"} </span>  
                     
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
